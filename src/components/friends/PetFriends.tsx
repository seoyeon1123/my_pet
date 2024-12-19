import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { PetType } from '@/types/ pet';

const PetFriends = ({ pets }: { pets: PetType[] }) => {
  return (
    <div
      className="grid 
    xs:grid-cols-2
     sm:grid-cols-2
    grid-cols-4 gap-4 p-5">
      {pets.map((pet, index) => (
        <Link
          href={`/home/friends/${pet.id}`}
          key={index}
          className="flex flex-col justify-center items-center mb-4 gap-2">
          <div className="flex justify-center items-center relative overflow-hidden">
            <Image
              src={pet.imageUrl!}
              width={250}
              height={250}
              className="object-cover aspect-square rounded-lg"
              alt="Pet Image"
            />
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <h2 className=" text-base font-semibold">{pet.name}</h2>
            <span>
              {pet.gender === '여자' ? (
                <FontAwesomeIcon icon={faVenus} className="size-5 text-darkPink" />
              ) : (
                <FontAwesomeIcon className="size-5 text-blue-500" icon={faMars} />
              )}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PetFriends;
