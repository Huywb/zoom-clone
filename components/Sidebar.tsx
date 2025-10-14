'use client'
import { siderbarLink } from '@/contants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6 '>
            {siderbarLink.map((item)=>(
                <Link href={item.route} key={item.label} className={`flex gap-4 items-center p-4 rounded-lg 
                    ${(pathname == item.route  ? 'bg-blue-500' : '')}`}>
                    <Image src={item.imgUrl} alt={item.label} width={24} height={24}></Image>
                    <p className='text-lg font-semibold max-lg:hidden'>
                        {item.label}
                    </p>
                </Link>
            ))}
        </div>


    </section>
  )
}

export default Sidebar
