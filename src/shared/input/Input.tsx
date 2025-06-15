import React from 'react';
import css from './input.module.scss';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'number';
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const Input: React.FC<InputProps> = ({ label, placeholder, type, register, error }) => {
  return (
    <div className={css.input}>
      <label className={css.label}>{label}</label>
      <input
        className={`${css.inputField} ${error ? css.error : ''}`}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className={css.errorMessage}>{error.message}</span>}
    </div>
  );
};
