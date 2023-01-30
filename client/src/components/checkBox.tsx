import { SyntheticEvent } from "react";
import { CheckBoxInput, CheckBoxLabel } from "../style/styledComponents";

interface CheckBoxProps {
  isChecked: boolean;
  onChange?: (e: SyntheticEvent) => void;
  name?: string;
  label?: string;
}

const CheckBox = ({ isChecked, name, label, onChange }: CheckBoxProps) => {
  return (
    <>
      <CheckBoxInput
        id="allCheckBox"
        name={name || "all"}
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
      />
      <CheckBoxLabel htmlFor="allCheckBox" style={{ paddingLeft: "28px" }}>
        {label}
      </CheckBoxLabel>
    </>
  );
};

export default CheckBox;
