interface IButton {
  type: 'submit' | 'reset' | 'button' | undefined;
  description: string;
}

const Button = ({ type, description }: IButton) => {
  return (
    <>
      <button
        type={type}
        className="w-full bg-darkPink text-white py-3 rounded-2xl hover:bg-lightGreen/90 transition duration-300 ease-in-out"
      >
        {description}
      </button>
    </>
  );
};

export default Button;
