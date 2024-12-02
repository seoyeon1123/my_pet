interface IButton {
  type?: 'submit' | 'reset' | 'button';
  description?: string; // description은 선택적으로 유지
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ type = 'button', description, onClick, children, disabled }: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-darkPink text-white py-3 rounded-2xl hover:bg-lightGreen/90 transition duration-300 ease-in-out">
      {children || description} {/* children 우선 사용 */}
    </button>
  );
};

export default Button;
