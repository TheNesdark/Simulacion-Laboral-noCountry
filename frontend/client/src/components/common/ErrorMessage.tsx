interface ErrorMessageProps {
    error: Error;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-auto gap-4" role="alert">
            <strong className="font-bold">¡Error! </strong>
            <span className="block sm:inline">{error.message}</span>
        </div>
    );
};

export default ErrorMessage;