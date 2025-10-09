'use client'

import { Field, useField } from "formik";
import { InputMask } from "@react-input/mask";

interface FieldProps {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  change?: (e: any) => void
}

export const TextField: React.FC<FieldProps> = ({ name, change, type, value, placeholder, label }) => {
  return (
    <div className="w-full self-end">
      {label && <Label labelText={label} />}
      <input
        className="bg-white text-[#656565] border-2 shadow-md border-[#A3A3A3] rounded-2xl px-4 py-3 w-full focus:outline-none"
        name={name} type={type} value={value} onChange={change} placeholder={`Pesquisar por ${placeholder}`}>
      </input>
    </div>
  )
}

export const FormikTextField: React.FC<FieldProps> = ({ name, type, placeholder, label }) => {
  return (
    <div className="w-full">
      <Label labelText={label} />
      <Field
        className="text-center bg-white text-[#656565] border-2 shadow-md border-[#725743] rounded-2xl py-4 w-full focus:outline-none"
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
        className="text-center bg-white text-[#656565] border-2 shadow-md border-[#725743] rounded-2xl py-4 w-full focus:outline-none"
      />
    </div>
  )
};

interface SelectFieldProps {
  name: string,
  label?: string,
  options?: string[];
  filtro?: string;
  change?: (e: any) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ change, name, options, label, filtro }) => {
  return (
    <div>
      {label && <Label labelText={label} />}
      <select
        className="bg-white text-[#656565] border-2 shadow-md border-[#A3A3A3] rounded-2xl px-4 py-3 w-full focus:outline-none cursor-pointer"
        name={name} onChange={change} disabled={filtro === "todos"}>
        {options?.map((option, index) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export const FormikSelectField: React.FC<SelectFieldProps> = ({ name, options, label }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && <Label labelText={label} />}
      <select
        className="text-center bg-white text-[#656565] border-2 shadow-md border-[#725743] rounded-2xl py-4 w-full focus:outline-none cursor-pointer"
        {...field} name={name}>
        {options?.map((option, index) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

const Label = (props: { labelText?: string }) => {
  return <label className="px-3 text-[#725743] font-medium">{props.labelText}</label>
}
