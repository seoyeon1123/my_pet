import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ICardProps {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  altText: string;
}

const MainCard = ({ imageSrc, title, description, altText }: ICardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform w-[350px] h-[230px]">
      <Image src={imageSrc} alt={altText} className="w-20 h-20 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2 text-darkPink">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default MainCard;
