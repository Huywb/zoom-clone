import Image from 'next/image'


interface HomeCardProps{
    className: string,
    handleClick: ()=>void,
    img: string,
    title : string,
    description: string
}

const HomeCard:React.FC<HomeCardProps> = ({className,handleClick,img,title,description}) => {
  return (
    <div onClick={handleClick} className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-p[270px] min-h-[260px] rounded-[14px] cursor-pointer`}>
        <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <Image src={img} width={27} height={27} alt='meeting' />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-normal'>{description}</p>
        </div>
    </div>
  )
}

export default HomeCard
