import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export function LoginButton({
  children,
  type,
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      type={type}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
