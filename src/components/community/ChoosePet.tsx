import { petId, userPet } from '@/app/home/community/post/create/actions';
import { postState } from '@/state/postState';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const ChoosePet = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = Number(user?.id);
  const [pet, setPet] = useState<any[]>([]);
  const [selectedPet, setSelectedPet] = useState('');
  const [post, setPost] = useRecoilState(postState);

  useEffect(() => {
    const getPet = async () => {
      if (userId) {
        const pets = await userPet(userId);
        console.log('Pets:', pets);

        if (pets) {
          setPet(pets);
        }
      } else {
        console.log('User ID is not available');
      }
    };

    getPet();
  }, [userId]);

  useEffect(() => {
    const updatePetData = async () => {
      if (selectedPet) {
        const petData = await petId(selectedPet);

        if (petData && petData.id) {
          console.log('Selected Pet ID:', petData.id);

          const petIdNumber = Number(petData.id);
          if (!isNaN(petIdNumber)) {
            setPost((prev) => ({
              ...prev, // 기존 값들을 유지하며 덮어쓰기
              petname: selectedPet,
              petId: petIdNumber.toString(),
            }));
          } else {
            console.log('Invalid petId');
          }
        } else {
          console.log('Pet not found');
        }
      }
    };

    updatePetData();
  }, [selectedPet, setPost]);

  const handlePetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPet = e.target.value;
    setSelectedPet(selectedPet);
  };

  return (
    <div>
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
    </div>
  );
};

export default ChoosePet;
