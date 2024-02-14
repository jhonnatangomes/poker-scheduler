import { HTMLProps } from 'react';

export function LoginInput({
  type,
  name,
  id,
  placeholder,
  className,
  ...props
}: HTMLProps<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id || name}
        name={name}
        type={type}
        required
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
