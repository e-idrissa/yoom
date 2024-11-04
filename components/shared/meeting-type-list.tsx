"use client"

import { useState } from "react";
import HomeCard from "./home-card";
import { useRouter } from "next/navigation";
import MeetingModal from "./meeting-modal";

const MeetingTypeList = () => {
   const router = useRouter()
   const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>()
   
   const createMeeting = () => {}

   return (
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
         <HomeCard
            img="/icons/add-meeting.svg" 
            title="New Meeting" 
            desc="Start an instant meeting"
            onClick={() => setMeetingState("isInstantMeeting")}
            className="bg-orange-1"
         />
         <HomeCard
            img="/icons/schedule.svg" 
            title="Schedule Meeting" 
            desc="Plan your meeting"
            onClick={() => setMeetingState('isScheduleMeeting')}
            className="bg-blue-1"
         />
         <HomeCard
            img="/icons/recordings.svg" 
            title="View Recordings" 
            desc="Check out your recordings"
            onClick={() => router.push('/recordings')}
            className="bg-purple-1"
         />
         <HomeCard
            img="/icons/join-meeting.svg" 
            title="Join Meeting" 
            desc="Join via invitation link"
            onClick={() => setMeetingState('isJoinMeeting')}
            className="bg-yellow-1"
         />
         <MeetingModal 
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            onClick={createMeeting}
         />
      </section>
   )
}

export default MeetingTypeList