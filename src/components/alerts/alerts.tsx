'use client'

import { ErrorMessage, useField } from 'formik'
import { Button, CloseButton } from '@/components'

interface alertsProps {
    SuccessMessage: string
}

export const SuccessAlert: React.FC<alertsProps> = ({ SuccessMessage }) => {
    return (
        <div className="flex items-center py-3 px-4 text-sm text-green-800 rounded-3xl bg-green-50" role="alert">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium ml-2">{SuccessMessage}</span>
            </div>
        </div>
    )
}

interface ErrorAlertsProps {
    name: string;
    component?: React.ElementType;
}

export const ErrorAlert: React.FC<ErrorAlertsProps> = ({ name, component }) => {
    const [, meta] = useField(name)

    return (
        <>
            {meta.touched && meta.error && (
                <div className="mt-2 flex items-center px-4 py-3 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-red-800 rounded-2xl bg-red-200">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <div className='ml-2'>
                        <ErrorMessage name={name} component={component} />
                    </div>
                </div>
            )}
        </>
    )
}

interface ModalConfirm {
    title?: string,
    message?: string,
    onConfirm: () => void,
    onCancel: () => void,
    isOpen: boolean,
}

export const ModalConfirm: React.FC<ModalConfirm> = ({ title, message, onConfirm, onCancel, isOpen }) => {
    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className={`${isOpen ? 'flex' : 'hidden'}
                         overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center cursor-default items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>

            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                <div className="bg-[#F3F3F3] rounded-2xl p-4 w-full max-w-sm shadow-lg border-t-8 " style={{ borderColor: "#3D2422"}}>
                    <div className="flex justify-between items-start">
                        <CloseButton onClick={onCancel} />
                    </div>

                    <div className="p-2 text-center">
                        <h3 className="mb-2 text-xl font-normal text-gray-900">
                            {title}
                        </h3>
                        <p className="text-gray-700 mt-4 mb-8">{message}</p>
                        <div className="flex justify-center">
                            <div className='flex gap-2'>
                                <Button theme='primary' onClick={onConfirm} functionName='Sim, apagar' />
                                <Button theme='back' onClick={onCancel} functionName='Não, cancelar' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    isSuccess: boolean;
    onConfirmSuccess?: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    isSuccess,
    onConfirmSuccess
}) => {
    if (!isOpen) return null;

    const buttonTheme = isSuccess ? "confirm" : "primary";

    const handleButtonClick = () => {
        onClose();
        if (isSuccess && onConfirmSuccess) {
            onConfirmSuccess();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-[#F3F3F3] rounded-2xl p-8 w-full max-w-sm shadow-lg border-t-8"
                style={{ borderColor: isSuccess ? '#05674B' : '#B23C3C' }}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className={`text-xl font-bold ${isSuccess ? 'text-[#4BB543]' : 'text-[#3D2422]'}`}>{title}</h2>
                    <CloseButton onClick={onClose} />
                </div>

                <div className="text-gray-700 mt-4 mb-8">
                    <p>{message}</p>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-[12rem]">
                        <Button functionName="Fechar" onClick={handleButtonClick} theme={buttonTheme} />
                    </div>
                </div>
            </div>
        </div>
    );
};