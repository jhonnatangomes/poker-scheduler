type InputProps = {
  name?: string;
  containerClassName?: string;
  className?: string;
  labelClassName?: string;
  type: 'text' | 'money';
  placeholder?: string;
};
export function Input({
  name,
  containerClassName,
  className,
  type,
  placeholder,
  labelClassName,
}: InputProps) {
  const typeToInputType = (type: string) =>
    type === 'money' ? 'number' : type;
  return (
    <div
      className={`w-full md:w-1/3 md:pr-2 mb-4 md:mb-0 ${containerClassName}`}
    >
      {name && (
        <label
          className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {name}
        </label>
      )}
      <input
        type={typeToInputType(type)}
        placeholder={placeholder}
        className={`block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 ${className}`}
      />
    </div>
  );
}
