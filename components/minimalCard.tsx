
interface MinimalCardProps {
  onClick: () => void;
  imageUrl: string;
  label: string;
  selected?: boolean;
  hover?: boolean;
}

const MinimalCard = ({ onClick, imageUrl, label, selected, hover }: MinimalCardProps) => {
  return (
    <a
      onClick={onClick}
      className={`my-2 overflow-hidden max-w-sm bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${hover? "hover:border-blue-500" : ""} ${selected ? "border-blue-500" : ""}`}
    >
      <img src={imageUrl} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{label}</h5>
      </div>
    </a>
  )
}

export default MinimalCard;
