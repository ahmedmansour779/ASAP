import { trans } from "@mongez/localization";
import {
  FormControlProps,
  patternRule,
  requiredRule,
} from "@mongez/react-form";
import TextInput from "./TextInput";

export default function PhoneNumberInput(props: FormControlProps) {
  return (
    <TextInput
      required
      placeholder={trans("phoneNumber")}
      name="phoneNumber"
      pattern={/^01(0|1|2|5)(\d){8}$/}
      rules={[patternRule, requiredRule]}
      {...props}
    />
  );
}
