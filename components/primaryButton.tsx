interface PrimaryButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    const { text, disabled, ...rest } = props;
    if (disabled) {
        return <button
            {...rest}
            type="button"
            className="flex-1 text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={true}
        >{text}</button>
    }
    return (
        <button
            {...rest}
            type="button"
            className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >{text}</button>
    )
}

export default PrimaryButton;
