import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import React from "react";

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All videos" subheader="Public Library" />
      <h1 className="text-2xl font-karla">Welcome to Loom clone</h1>
      <VideoCard
        id="1"
        title="Snapchat"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt="2025-01-01 06:25:54.435"
        userImg="/assets/images/jason.png"
        views={10}
        visibility="public"
        duration={156}
      />
    </main>
  );
};

export default Page;
