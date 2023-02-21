import { SyntheticEvent, useCallback, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { PayUserInfoType } from "../../pages/payment";
import { CloseIcon } from "../../style/icons/icons";
import CheckBox from "../checkBox";

interface NewAddressProps {
  payUserInfo: PayUserInfoType;
  setPayUserInfo: React.Dispatch<React.SetStateAction<PayUserInfoType>>;
}
const NewAddress = ({
  setPayUserInfo,
  payUserInfo: { recipient, address, detailedAddress, checkAddress },
}: NewAddressProps) => {
  const [isShowDaumPost, setIsShowDaumPost] = useState(false);

  const selectAddress = useCallback(
    (data: any) => {
      let fullAddress = data.address;
      let extraAddress = "";
      if (data.addressType === "R") {
        if (data.bname) extraAddress += data.bname;
        if (data.buildingName) {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
      const address = `${fullAddress}/${data.zonecode}` as string;
      setPayUserInfo((prev: PayUserInfoType) => ({
        ...prev,
        address,
      }));
      setIsShowDaumPost(false);
    },
    [setPayUserInfo],
  );

  const handelPayUserInfo = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      const { name, value, checked } = target;
      const newValue = name === "checkAddress" ? checked : value;

      setPayUserInfo((prev: PayUserInfoType) => ({
        ...prev,
        [name]: newValue,
      }));
    },
    [setPayUserInfo],
  );

  return (
    <div>
      <FlexBox>
        <h5>수령인</h5>
        <InputBox
          type="text"
          name="recipient"
          value={recipient}
          onChange={handelPayUserInfo}
          placeholder={"수령인"}
        />
      </FlexBox>
      <FlexBox style={{ position: "relative" }}>
        <h5>주소</h5>
        <InputBox
          type="text"
          onFocus={() => setIsShowDaumPost(true)}
          value={address.split("/")[0]}
          readOnly={true}
        />
        {isShowDaumPost && (
          <IconWrap>
            <CloseIcon onClick={() => setIsShowDaumPost(false)} />
          </IconWrap>
        )}
      </FlexBox>
      {isShowDaumPost && (
        <AddressBox>
          <div>
            <DaumPostcode
              style={{ height: "550px" }}
              onComplete={selectAddress}
            />
          </div>
        </AddressBox>
      )}
      <FlexBox>
        <h5>상세주소</h5>
        <InputBox
          type="text"
          name="detailedAddress"
          value={detailedAddress}
          onChange={handelPayUserInfo}
          placeholder="상세주소 입력"
        />
      </FlexBox>
      <CheckBox
        onChange={handelPayUserInfo}
        name="checkAddress"
        isChecked={checkAddress}
        label="최근 배송지로 저장"
      />
    </div>
  );
};

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  > h5 {
    font-size: 1.1rem;
    font-weight: 400;
    width: 25%;
  }
`;

const InputBox = styled.input`
  width: 75%;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  :focus {
    outline: none !important;
    border-color: black;
  }
  .popup_foot show {
    display: none !important;
  }
`;

const AddressBox = styled.div`
  position: relative;
`;

const IconWrap = styled.div`
  position: absolute;
  right: 1rem;
  z-index: 1;
  /* tr */
`;

export default NewAddress;
