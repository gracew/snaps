import Spinner from "./spinner";

interface PrimaryButtonProps extends React.HTMLProps<HTMLAnchorElement> {
    text: string;
    loading?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    const { text, disabled, className, loading, ...rest } = props;
    if (disabled || loading) {
        return <a
            {...rest}
            type="button"
            className={`flex-1 text-gray-800 bg-lime-200 cursor-not-allowed font-medium rounded-lg text-sm px-4 py-2.5 text-center ${className}`}
        >
            {text}
            {loading && <Spinner />}
        </a>
    }
    return (
        <a
            {...rest}
            type="button"
            className={`cursor-pointer flex-1 text-gray-800 bg-lime-300 hover:bg-lime-400 focus:ring-2 focus:ring-blue-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center ${className}`}
        >{text}</a>
    )
}

export default PrimaryButton;
