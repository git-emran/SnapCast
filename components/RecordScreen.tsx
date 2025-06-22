"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";
import { useRouter } from "next/navigation";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";

const RecordScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();

    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  };

  return (
    <div className="record">
      <button className="primary-btn" onClick={() => setIsOpen(true)}>
        <Image
          src="/assets/icons/record.svg"
          alt="record"
          height={16}
          width={16}
        />
        {isOpen && (
          <section className="dialog">
            <div className="overlay-record" onClick={closeModal}>
              <div className="dialog-content">
                <figure>
                  <h3>Screen Recording</h3>
                  <button onClick={closeModal}>
                    <Image
                      src={ICONS.close}
                      alt="Close"
                      width={20}
                      height={20}
                    />
                  </button>
                </figure>
                <section>
                  {isRecording ? (
                    <article>
                      <div>
                        <span>Recording in Progress</span>
                      </div>
                    </article>
                  ) : recordedVideoUrl ? (
                    <video ref={videoRef} src={recordedVideoUrl} />
                  ) : (
                    <p>Click record to start capturing your screen</p>
                  )}
                </section>
                <div className="record-box">
                  {!isRecording && !recordedVideoUrl && (
                    <button onClick={handleStart} className="record-start">
                      <Image
                        src={ICONS.record}
                        alt="Record"
                        width={16}
                        height={16}
                      />
                      Record
                    </button>
                  )}
                  {isRecording && (
                    <button className="record-stop">
                      <Image
                        src={ICONS.record}
                        alt="Record-stop"
                        width={16}
                        height={16}
                      />
                      Stop Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        <span>Record a video</span>
      </button>
    </div>
  );
};

export default RecordScreen;
