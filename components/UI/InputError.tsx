'use client'

import { CommonProps } from '@/types/UI'
import classnameJoin from '@/utils/ui'
import { BiSolidError } from 'react-icons/bi'

type InputErrorProps = CommonProps & {
  errorMessage?: string
}

const InputError = ({ className, errorMessage }: InputErrorProps) => {
  return (
    <div
      className={classnameJoin(
        'flex items-center gap-2 text-xs text-red-500 mt-2',
        className,
      )}
    >
      <BiSolidError className="inline-block mr-1 h-6 w-6" />
      <span>{errorMessage}</span>
    </div>
  )
}

export default InputError
