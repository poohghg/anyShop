import { SyntheticEvent, useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { ShippingInfoProps } from "./shippingInfo";

type NewAddressProps = Omit<ShippingInfoProps, "nickName">;

const NewAddress = ({
  setPayUserInfo,
  payUserInfo: { recipient, address, detailedAddress },
}: NewAddressProps) => {
  const [isShowDaumPost, setIsShowDaumPost] = useState(false);

  const selectAddress = (data: any) => {
    console.log(data);
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
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // console.log(data.zonecode);

    const address = `${fullAddress}/${data.zonecode}` as string;
    setPayUserInfo((prev) => ({
      ...prev,
      address,
    }));
    setIsShowDaumPost(false);
  };

  const handelPayUserInfo = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setPayUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <FlexBox>
        <h5>수령인</h5>
        <InputBox
          type="text"
          name="recipient"
          value={recipient}
          onChange={handelPayUserInfo}
        />
      </FlexBox>
      <FlexBox>
        <h5>주소</h5>
        <InputBox
          type="text"
          onFocus={() => setIsShowDaumPost(true)}
          value={address.split("/")[0]}
        />
      </FlexBox>
      {isShowDaumPost && (
        <div>
          <DaumPostcode
            style={{ height: "550px" }}
            onComplete={selectAddress}
          />
        </div>
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
  :focus {
    outline: none !important;
    border-color: black;
  }

  .popup_foot show {
    display: none !important;
  }
`;

export default NewAddress;
