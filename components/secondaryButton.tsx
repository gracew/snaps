interface SecondaryButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
    const { text, ...rest } = props;
    return (
        <button
            {...rest}
            type="button"
            className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >{text}</button>
    )
}

export default SecondaryButton;
