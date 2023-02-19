import styled from "styled-components";
import AddProduct from "../../components/admin/addProduct";

const AdminPage = () => {
  return (
    <Wrap>
      <AddProduct />
    </Wrap>
  );
};

export default AdminPage;

const Wrap = styled.div`
  max-width: 720px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 2rem;
`;
