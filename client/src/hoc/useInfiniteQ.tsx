import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import styled, { css } from "styled-components";
import { authFetcher } from "../queryClient";

interface UseInfiniteQProps {
  qKey: string | string[];
  query: string;
  variables?: {};
}
const PAGE_SIZE = 15;

const useInfiniteQ = <T extends { [K: string]: any[] }>({
  qKey,
  query,
  variables,
}: UseInfiniteQProps) => {
  const [inViewRef, inView] = useInView({
    threshold: 0.3,
  });
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<T>(
    qKey,
    ({ pageParam = "" }) =>
      authFetcher(query, { cursor: pageParam, ...variables }),
    {
      refetchOnMount: true,
      staleTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const d = Object.values(lastPage)[0];
        if (d.length < PAGE_SIZE || !d.at(-1)?.id) return undefined;
        return d.at(-1)?.id;
      },
    },
  );

  useEffect(() => {
    if (!inView || !isSuccess || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [inView]);

  const RefDom = useCallback(() => {
    return (
      <RefDiv
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        ref={inViewRef}
      />
    );
  }, [isFetchingNextPage, hasNextPage]);

  return { RefDom, data, status };
};

export default useInfiniteQ;

const RefDiv = styled.div<{
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}>`
  display: block;
  ${({ hasNextPage, isFetchingNextPage }) =>
    (!hasNextPage || isFetchingNextPage) &&
    css`
      display: none;
    `};
`;
