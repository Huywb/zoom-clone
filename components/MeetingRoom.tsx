import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
    const searchParams = useSearchParams()
    const [layout,setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants,setShowParticipants] = useState(false)
    const isPersonalRoom = !!searchParams.get('personal')
    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()
    const router = useRouter()
    const CallLayout = ()=>{
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout></PaginatedGridLayout> 
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='left'></SpeakerLayout>
            default:
                return <SpeakerLayout participantsBarPosition='right'></SpeakerLayout>

        }
    }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
            <CallLayout></CallLayout>
        </div>
        <div className={`${showParticipants ? 'show-block' : ''}h-[calc(100vh-86px)] hidden ml-2`}>
            <CallParticipantsList onClose={()=>setShowParticipants(false)}></CallParticipantsList>
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5'>
        <CallControls onLeave={()=>router.push('/')}></CallControls>

        <DropdownMenu>
            <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b'>
                <LayoutList size={20} className='text-white'></LayoutList>
            </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                {['Grid','Speaker-Left','Speaker-Right'].map((item,index)=>(
                    <div key={index}>
                        <DropdownMenuItem onClick={()=>{setLayout(item.toLowerCase() as CallLayoutType)}} className='cursor-pointer'>
                            {item}
                        </DropdownMenuItem>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton></CallStatsButton>
        <button onClick={()=>setShowParticipants((prev)=>!prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                <User size={20} className='text-white' />
            </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
