import styled from "styled-components";

interface PageTitleProps {
  label: string;
}

const PageTitle = ({ label }: PageTitleProps) => <Title>{label}</Title>;

export default PageTitle;

const Title = styled.h2`
  padding: 1rem 1.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: 1px 2px 12px 4px rgb(0 0 0 / 50%);
`;
