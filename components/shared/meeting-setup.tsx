"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
};

const MeetingSetup = ({ setIsSetupComplete }: Props) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false);
  const call = useCall();

  if (!call)
    throw new Error("useCall() must be used within StreamCall component.");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <h1 className="text-2xl text-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-3">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setisMicCamToggledOn(e.target.checked)}
          />
          Join with camera and microphone off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
