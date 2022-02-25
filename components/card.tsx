
interface CardProps {
  onClick: () => void;
  imageUrl: string;
  label: string;
  description: string;
  selected?: boolean;
  hover?: boolean;
}

const Card = ({ onClick, imageUrl, label, description, selected, hover }: CardProps) => {
  return (
    <a
      onClick={onClick}
      className={`my-2 overflow-hidden max-w-sm bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${hover? "hover:border-blue-500" : ""} ${selected ? "border-blue-500" : ""}`}
    >
      <img src={imageUrl} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{label}</h5>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </a>
  )
}

export default Card
