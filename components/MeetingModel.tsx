import React, { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Button } from './ui/button'
interface MeetingModelProps{
    isOpen: boolean,
    onClose: ()=>void,
    title: string,
    className?: string,
    children?: ReactNode,
    handleClick?: ()=>void,
    buttonText?: string,
    image?: string,
    buttonIcon?: string
}

const MeetingModel:React.FC<MeetingModelProps> = ({isOpen,onClose,title,className,children,handleClick,buttonIcon,image,buttonText}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
           <div className='flex flex-col gap-6'>
                {
                    image && (
                        <div className='flex justify-center'>
                            <Image src={image} alt='img' width={72} height={72}/>
                        </div>
                    )
                }
                <h1 className='text-3xl font-bold leading-[42px]'>{title}</h1>
                <Button onClick={handleClick} className='transition duration-300 hover:bg-blue-400 cursor-pointer bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0'>
                    {buttonIcon && (
                        <Image src={buttonIcon} alt='button icon' width={13} height={13}></Image>
                    )}&nbsp;
                    {buttonText || 'Schedule Meeting'}
                </Button>
           </div>
        </DialogContent>
    </Dialog>
  )
}

export default MeetingModel
