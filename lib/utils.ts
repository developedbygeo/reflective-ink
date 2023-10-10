import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const classnameJoin = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default classnameJoin;
