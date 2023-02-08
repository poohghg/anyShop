import styled from "styled-components";

interface NoDataProps {
  label: string;
  imgSrc?: string;
}

const NoData = ({ label = "데이터가 없습니다." }: NoDataProps) => {
  return (
    <Container>
      <h3>{label}</h3>
    </Container>
  );
};

export default NoData;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  /* margin: auto; */
  /* max-width: 720px; */
  /* display:fle ; */
`;
