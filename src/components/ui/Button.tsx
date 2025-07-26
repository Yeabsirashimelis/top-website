import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import clsx from 'clsx';

const buttonStyles = cva(
  'inline-flex items-center justify-center font-semibold rounded-md transition focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-yellow-400 text-black hover:bg-yellow-300',
        secondary: 'bg-white text-blue-900 border border-blue-900 hover:bg-blue-100',
        dark: 'bg-blue-900 text-white hover:bg-blue-800',
        ghost: 'bg-transparent text-blue-900 hover:underline',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
  };

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
};
