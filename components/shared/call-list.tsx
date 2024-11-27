

"use client";

import { useGetCalls } from "@/hooks/use-get-calls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingCard from "./meeting-card";
import Loader from "./loader";

type Props = {
  type: "ended" | "upcoming" | "recording";
};

const CallList = ({ type }: Props) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording>();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return callRecordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recording":
        return "No Recordings";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((call: Call | CallRecording) => 
        <MeetingCard 
          key={(call as Call)?.id}
          icon={ type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'}
          title={(call as Call).state.custom.description.substring(0, 25) || "No description available"}
          date={(call as Call).state.startedAt?.toLocaleString() || (call as CallRecording).start_time.toLocaleString()}
          isPreviousMeeting={type === 'ended'}
          buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
          buttonText={type === 'recording' ? 'Play' : 'Start'}
          // handleClick={type === 'recording' ? router.push(`${(call as CallRecording).url}`) : router.push(`/meeting/${(call as Call).id}`)}//-
          handleClick={() => {
            if (type === 'recording') {
              router.push(`${(call as CallRecording).url}`);
            } else {
              router.push(`/meeting/${(call as Call).id}`);
            }
          }}
          link={type === 'recording' ? (call as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(call as Call)?.id}`}
        />
      )
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
