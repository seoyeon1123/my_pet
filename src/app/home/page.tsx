import getPet from './actions';
const HomePage = async () => {
  const pet = await getPet();

  return (
    <>
      <h1>안녕하세요 {pet?.name}</h1>
    </>
  );
};

export default HomePage;
