'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/clerk-react'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState,setMeetngState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantmeeting' | undefined>()
    
    const [values,setValues] = useState(
        {
            date: new Date(),
            description: '',
            link: ''
        }
    )

    const [callDetails,setCallDetails] = useState<Call>()
    const {user} = useUser()
    const client = useStreamVideoClient()

    const createMeeting =async ()=>{
        if(!client || !user) return
        
        try {
            if(!values.date){
                toast.error("Please select a date and time")
                return
            }
            const id = crypto.randomUUID()
            const call = client.call("default",id)

            if(!call) throw Error("Failed to create call")

            const startsAt = values.date.toISOString() || new Date(Date.now()).toISOString()

            const description = values.description || "Instant meeting"

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call)

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast.success("Meeting created")
        } catch (error) {
            toast.error("Event has been created.")
            console.log(error)
        }
    }
  
    return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard className='bg-orange-500' handleClick={()=>setMeetngState('isInstantmeeting')} img='/icons/add-meeting.svg' title='New Meeting' description='Start an instant meeting' />
        <HomeCard className='bg-blue-600' handleClick={()=>setMeetngState('isScheduleMeeting')} img='/icons/schedule.svg' title='Schedule Meeting' description='Plan your meeting' />
        <HomeCard className='bg-purple-700' handleClick={()=>router.push('/recordings')} img='/icons/recordings.svg' title='View Recordings' description='Check out your recordings' />
        <HomeCard className='bg-yellow-500' handleClick={()=>setMeetngState('isJoiningMeeting')} img='/icons/join-meeting.svg' title='Join Meeting' description='Via invitation link' />

        
        {!callDetails ? (
            <MeetingModel 
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={()=> setMeetngState(undefined)}
                title='Create Meeting'
                handleClick={createMeeting}
            >
                <div className='flex flex-col gap-2.5'>
                    <label className='text-base text-nowrap leading-[22px]'>
                        Add a description
                    </label>
                    <Textarea onChange={(e)=> {
                        setValues({...values,description: e.target.value})
                    }} className='border-none bg-dark-3 focus-within:ring-0 focus-within:ring-offset-0'/>
                </div>
                <div className='flex w-full flex-col gap-2.5'>
                    <label className='text-base text-nowrap leading-[22px]'>
                        Select Date and Time
                    </label>
                    <ReactDatePicker 
                        selected={values.date}
                        onChange={(time)=> setValues({...values,date: time!})}
                        showTimeSelect
                    />
                </div>
            </MeetingModel>
            ): (
            <MeetingModel 
                isOpen={meetingState === 'isScheduleMeeting'} 
                onClose={()=>setMeetngState(undefined)}
                title="Meeting created"
                className='text-center'
                handleClick={()=>{
                }}
                image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                buttonText='Coppy Meeting Link'
            />
            )
        }

    <MeetingModel 
        isOpen={meetingState === 'isInstantmeeting'} 
        onClose={()=>setMeetngState(undefined)}
        title="Start an Instant Meeting"
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
    />
    </section>
  )
}

export default MeetingTypeList
