"use client";

import Loader from "@/components/shared/loader";
import MeetingRoom from "@/components/shared/meeting-room";
import MeetingSetup from "@/components/shared/meeting-setup";
import { useGetCall } from "@/hooks/use-get-call";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCall(id)

  if (isCallLoading || !isLoaded) return <Loader /> 

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
};

export default Meeting;
