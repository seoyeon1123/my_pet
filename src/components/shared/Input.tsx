import React from 'react';

export interface IInputProps {
  name: string;
  type: string;
  placeholder: string;
  error?: string[];
  dataCy?: string; // data-cy를 camelCase로 변경하여 사용
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 타입 변경
}

const Input = ({ name, value, onChange, type, placeholder, error, dataCy }: IInputProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-cy={dataCy} // data-cy 속성을 input 태그에 전달
        className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1
        focus:ring-darkPink focus:border-darkPink transition duration-300 ease-in-out w-full"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
