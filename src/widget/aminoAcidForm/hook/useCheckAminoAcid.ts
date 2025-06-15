import { useForm, type SubmitHandler, type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { useState } from 'react';
interface FormValues {
    firstPair: string;
    secondPair: string;
}

interface UseValidateForm {
  register: UseFormRegister<FormValues>;
  setActiveTab: (value: string) => void;
  handleSubmit: (callback: SubmitHandler<FormValues>) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: SubmitHandler<FormValues>;
  errors: FieldErrors<FormValues>;
  checkValue: { value: string, background: string | false}[]
  setValue: (name: keyof FormValues, value: string) => void;
}

export const useCheckAminoAcid = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormValues>();
  
  const [checkValue, setCheckValue] = useState<UseValidateForm['checkValue']>([]);
  const [open, setOpen] = useState(false)

  const colors: { [key: string]: string } = {
    'C': '#ffea00',
    'A': '#67e4a6',
    'I': '#67e4a6',
    'L': '#67e4a6',
    'M': '#67e4a6',
    'F': '#67e4a6',
    'W': '#67e4a6',
    'Y': '#67e4a6',
    'V': '#67e4a6',
    'P': '#67e4a6',
    'G': '#c4c4c4',
    'D': '#fc9cac',
    'E': '#fc9cac',
    'K': '#bb99ff',
    'R': '#bb99ff',
    'S': '#80bfff',
    'T': '#80bfff',
    'H': '#80bfff',
    'Q': '#80bfff',
    'N': '#80bfff',
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const firstPair = data.firstPair.toUpperCase();
    const secondPair = data.secondPair.toUpperCase();
    
    const checkedPair: { value: string, background: string | false}[] = [];

    for (let i = 0; i < firstPair.length; i++) {
      if (firstPair[i] !== secondPair[i]) {
        checkedPair.push({ 
          value: secondPair[i],
          background: false 
        });
      } else {
        checkedPair.push({ 
          value: secondPair[i],
          background: colors[secondPair[i]] 
        });
      }
    }
    setOpen(true)
    setCheckValue(checkedPair)
  };

  return {
    checkValue,
    register,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    setValue,
    open,
    setOpen
  };
};