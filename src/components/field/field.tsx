import { Field, useField } from "formik";
import { InputMask } from "@react-input/mask";

interface FieldProps {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string
}

export const TextField: React.FC<FieldProps> = ({ name, type, placeholder, label }) => {
  return (
    <div className="w-full">
      <Label labelText={label} />
      <Field
        className="text-center bg-white text-[#656565] border-2 shadow-md border-[#725743] rounded-3xl py-4 w-full focus:outline-none"
        name={name} type={type} placeholder={placeholder}>
      </Field>
    </div>

  )
}

interface MaskedTextFieldProps {
  name: string;
  mask: string;
  text?: string;
  placeholder?: string;
  label?: string
}

export const MaskedTextField: React.FC<MaskedTextFieldProps> = ({ name, mask, placeholder, label }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="w-full">
      <Label labelText={label} />
      <InputMask
        mask={mask}
        replacement={{ X: /\d/ }}
        value={field.value || ''}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
        className="text-center bg-white text-[#656565] border-2 shadow-md border-[#725743] rounded-3xl py-4 w-full focus:outline-none"
      />
    </div>
  )
};

interface SelectFieldProps {
  name: string,
  label?: string,
  options?: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, options, label }) => {
  return (
    <div>
      <Label labelText={label} />
      <Field
        as="select"
        className="text-center bg-white text-[#656565] border-2 shadow-md border-[#725743] rounded-3xl py-4 w-full focus:outline-none"
        name={name}>
        {options && options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
    </div>
  )
}

const Label = (props: { labelText?: string }) => {
  return <label className="px-3 text-[#725743] font-medium">{props.labelText}</label>
}
