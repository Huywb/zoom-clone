'use client'
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { Button } from '@/components/ui/button'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/clerk-react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({params}:{params: {id:string}}) => {
  const {user,isLoaded} = useUser()

  const [isSetupComplete,setIsSetupComplete] = useState(false)

  const {call, isCallLoading} = useGetCallById(params.id)

  if(!isLoaded || isCallLoading) return <Loader></Loader>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupComplete ? (
              <MeetingSetup  setIsSetupComplete={setIsSetupComplete}/>
            ) : (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
