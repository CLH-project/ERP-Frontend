interface FieldProps {
    name?: string;
    type?: string;
    placeholder?: string;
}

import { Field } from "formik";

export const TextField: React.FC<FieldProps> = ({ name, type, placeholder }) => {
    return (
        <Field
            className="border border-gray-300 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:"
            name={name} type={type} placeholder={placeholder}>
            </Field>
    )
}