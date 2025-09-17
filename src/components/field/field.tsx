import { Field, useField } from "formik";
import {InputMask} from "@react-input/mask";

interface FieldProps {
    name?: string;
    type?: string;
    placeholder?: string;
}

export const TextField: React.FC<FieldProps> = ({ name, type, placeholder }) => {
    return (
        <Field
            className="text-center bg-white border shadow-md border-[#CDCDCD] rounded-3xl py-5 w-full focus:outline-none"
            name={name} type={type} placeholder={placeholder}>
        </Field>
    )
}

interface MaskedTextFieldProps {
  name: string;
  mask: string;
  text?: string;
  placeholder?: string;
}

export const MaskedTextField: React.FC<MaskedTextFieldProps> = ({ name, mask, placeholder }) => {
    const [field, meta, helpers] = useField(name);

  return (
    <InputMask
        mask={mask}
        replacement={{ X: /\d/ }}
        value={field.value || ''}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
        className="text-center bg-white border shadow-md border-[#CDCDCD] rounded-3xl py-4 w-full focus:outline-none"
      />
    )
};
