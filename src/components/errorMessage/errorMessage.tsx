'use client'

import {ErrorMessage} from 'formik';

interface ErrorMessageProps {
    name: string;
    component?: React.ElementType;
}          

export const ErrorMessagePop: React.FC<ErrorMessageProps> = ({name, component}) => {
    return (
        <ErrorMessage className=" mt-2 py-4 text-center border-gray-300 rounded-2xl bg-red-800 text-amber-50 " name={name} component={component} />
    )
}