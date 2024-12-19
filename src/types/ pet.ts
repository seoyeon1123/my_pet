export type PetType = {
  id: number;
  imageUrl: string | null;
  name: string;
  type: string;
  age: string;
  category: string;
  breed: string | null;
  gender: string | null;
  neutered: string | null;
  otherBreed: string | null;
  traits: string[];
  reason: string | null;
  user: {
    username: string | null;
  };
};
