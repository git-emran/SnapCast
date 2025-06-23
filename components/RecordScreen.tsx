"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import { useRouter } from "next/navigation";

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

  /* ───────── helpers ───────── */
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording();
  };
  const handleStop = async () => {
    await stopRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();

    if (recordedVideoUrl && videoRef.current)
      videoRef.current.src = recordedVideoUrl;
  };

  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);

    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    );
    router.push("/upload");
    closeModal();
  };
  return (
    <div className="record">
      {/* trigger ******************************************************** */}
      <button className="primary-btn" onClick={openModal}>
        <Image
          src="/assets/icons/record.svg"
          alt="record"
          height={16}
          width={16}
        />
        <span>Record a video</span>
      </button>

      {/* modal ********************************************************** */}
      {isOpen && (
        <section className="dialog">
          {/* backdrop */}
          <div className="overlay-record" onClick={closeModal} />
          {/* dialog box */}
          <div
            className="dialog-content"
            onClick={(e) => e.stopPropagation} /* stop backdrop click */
          >
            {/* header */}
            <figure>
              <h3>Screen Recording</h3>
              <button aria-label="Close" onClick={closeModal}>
                <Image src={ICONS.close} alt="Close" width={20} height={20} />
              </button>
            </figure>

            {/* body */}
            <section>
              {isRecording ? (
                <article>
                  <div />
                  <span>Recording in Progress…</span>
                </article>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls />
              ) : (
                <p>
                  Click <strong>Record</strong> to start capturing your screen
                </p>
              )}
            </section>

            {/* controls */}
            <div className="record-box">
              {!isRecording && !recordedVideoUrl && (
                <button className="record-start" onClick={handleStart}>
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
                <button className="record-stop" onClick={handleStop}>
                  <Image src={ICONS.record} alt="Stop" width={16} height={16} />
                  Stop Recording
                </button>
              )}

              {recordedVideoUrl && (
                <>
                  <button className="record-again" onClick={recordAgain}>
                    Record Again
                  </button>
                  <button onClick={goToUpload} className="record-upload">
                    <Image
                      src={ICONS.upload}
                      alt="Upload"
                      width={16}
                      height={16}
                    />
                    Continue to Upload
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;
