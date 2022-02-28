import Spinner from "./spinner";

interface PrimaryButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string;
    loading?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    const { text, disabled, className, loading, ...rest } = props;
    if (disabled || loading) {
        return <button
            {...rest}
            type="button"
            className={`flex-1 text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
            disabled={true}
        >
            {text}
            {loading && <Spinner />}
        </button>
    }
    return (
        <button
            {...rest}
            type="button"
            className={`flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
        >{text}</button>
    )
}

export default PrimaryButton;
