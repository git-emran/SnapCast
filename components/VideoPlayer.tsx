import React from "react";
import { createIframeLink } from "@/lib/utils";

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  return (
    <div>
      <iframe
        src={createIframeLink(videoId)}
        loading="lazy"
        title="Video Player"
        style={{ border: 0, zIndex: 50 }}
        allowFullScreen
        allow="accleormeter; gyroscope; autoplay; encrypted-media; picture-in-picture "
      />
    </div>
  );
};

export default VideoPlayer;
