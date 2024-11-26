import db from '@/lib/db';
import getSession from '@/lib/session';

const getPet = async (userId: number) => {
  const pet = await db.pet.findFirst({
    where: {
      userId: userId,
    },
    select: {
      name: true,
    },
  });
  return pet;
};

const HomePage = async () => {
  const user = await getSession();
  const pet = await getPet(user?.id!);

  return (
    <>
      <h1>Hello {pet?.name}</h1>
    </>
  );
};

export default HomePage;
