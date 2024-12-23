import { petId, userPet } from '@/app/(layout)/home/community/post/create/actions';
import { postState } from '@/state/postState';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface IChoosePet {
  id: number;
  name: string;
  type: string;
}

const ChoosePet = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = Number(user?.id);
  const [pet, setPet] = useState<IChoosePet[]>([]);
  const [selectedPet, setSelectedPet] = useState('');
  const setPost = useSetRecoilState(postState);

  useEffect(() => {
    const getPet = async () => {
      if (userId) {
        const pets = await userPet(userId);
        if (pets) {
          setPet(pets);
        }
      }
    };

    getPet();
  }, [userId]);

  useEffect(() => {
    if (selectedPet) {
      const updatePetData = async () => {
        const petData = await petId(selectedPet);

        if (petData && petData.id) {
          const petIdNumber = Number(petData.id);
          if (!isNaN(petIdNumber)) {
            setPost((prev) => ({
              ...prev,
              petname: selectedPet,
              petId: petIdNumber.toString(),
            }));
          }
        }
      };
      updatePetData();
    }
  }, [selectedPet, setPost]);

  const handlePetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPet = e.target.value;
    setSelectedPet(selectedPet);
  };

  return (
    <div>
      <label htmlFor="petSelect" className="block text-lg font-semibold mb-2">
        누구의 고민인가요? 🐾
      </label>
      <select
        id="petSelect"
        className="w-full p-2 border rounded-lg"
        value={selectedPet || ''}
        onChange={handlePetSelect}>
        <option value="">나의 애완견</option>
        {pet.map((p) => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChoosePet;
