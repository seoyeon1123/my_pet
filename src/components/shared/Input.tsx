interface IInputProps {
  name: string;
  type: string;
  placeholder: string;
  error?: string[];
}

const Input = ({ name, type, placeholder, error }: IInputProps) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1
          focus:ring-darkPink focus:border-darkPink transition duration-300 ease-in-out w-full"
        />
        {error && (
          <>
            <p className="text-sm text-red-500">{error}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Input;
