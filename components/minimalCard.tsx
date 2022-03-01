import Image from "next/image";
import { ReactNode } from "react";

interface MinimalCardProps {
  onClick: () => void;
  imageUrl: string;
  label: string;
  secondaryLabel: string | ReactNode;
  selected?: boolean;
  hover?: boolean;
}

const MinimalCard = ({ onClick, imageUrl, label, secondaryLabel, selected, hover }: MinimalCardProps) => {
  return (
    <a
      onClick={onClick}
      className={`cursor-pointer my-2 overflow-hidden max-w-sm bg-gray-800 rounded-lg border-2 shadow-md ${hover ? "hover:border-blue-500" : ""} ${selected ? "border-blue-500" : "border-gray-700"}`}
    >
      <div className="h-48 overflow-hidden relative">
        <Image src={imageUrl} layout="fill" objectFit="cover" alt="" />
      </div>
      <div className="py-3 px-5">
        <h5 className="mb-1 text-md font-bold">{label}</h5>
        <div className="text-sm">{secondaryLabel}</div>
      </div>
    </a>
  )
}

export default MinimalCard;
