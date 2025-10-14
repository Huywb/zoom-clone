'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { siderbarLink } from '@/contants'
import { usePathname } from 'next/navigation'
const MobileNav = () => {
    const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild>
                <Image className='cursor-pointer sm:hidden' alt='hamburger' src='/icons/hamburger.svg' width={36} height={36} />
            </SheetTrigger>
            <SheetContent side='left' className='border-none bg-dark-1 p-4'>
                <Link href='/' className='flex items-center gap-2'>
                    <Image src='/icons/logo.svg' width={32} height={32} alt='Logo' className='max-sm:size-10' />
                    <p className='font-extrabold text-white text-[26px]'>Zhom</p>
                </Link>

                <div className='flex h-[calc(100vh- 72px)] flex-col justify-between overflow-y-auto'>
                    <SheetClose asChild>
                        <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {siderbarLink.map((item)=>(
                                <Link href={item.route} key={item.label} className={`flex gap-4 items-center p-4 rounded-lg 
                                    ${(pathname == item.route  ? 'bg-blue-500' : '')}`}>
                                    <Image src={item.imgUrl} alt={item.label} width={24} height={24}></Image>
                                    <p className='text-lg font-semibold '>
                                        {item.label}
                                    </p>
                                </Link>
                            ))}
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
