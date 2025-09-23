import { ErrorMessage, useField } from 'formik'
import { Button } from '@/components'

interface alertsProps {
    SuccessMessage: string
}

export const SuccessAlert: React.FC<alertsProps> = ({ SuccessMessage }) => {
    return (
        <div className="flex items-center py-4 px-4 mb-4 text-sm text-green-800 rounded-3xl bg-green-50 dark:bg-[#240D13] dark:text-green-400" role="alert">
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
                <div className="mt-2 flex items-center px-4 py-4 mb-4 text-sm text-red-800 rounded-2xl bg-red-200 dark:bg-[#240D13] dark:text-red-400">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
            className={`${isOpen ? 'flex' : 'hidden'
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center cursor-default items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/5">
                <div className="relative bg-[#f3f3f3] rounded-lg ">
                    <button type="button" onClick={onCancel}
                        className="cursor-pointer absolute top-3 end-2.5 text-zinc-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14">

                            <path stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-[#B23C3C] w-12 h-12"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-xl font-normal text-gray-900">
                            {title}
                        </h3>
                        <p className="mb-5 text-md text-gray-500 dark:text-gray-400">{message}</p>
                        <div className='flex gap-4'>
                            <Button theme='search' onClick={onCancel} functionName='Sim, apagar' />
                            <Button theme='back' onClick={onCancel} functionName='Não, cancelar' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}