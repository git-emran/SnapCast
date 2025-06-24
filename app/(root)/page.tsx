import Header from "@/components/Header";
import { getAllVideos } from "@/lib/actions/video";
import React from "react";

type SearchParams = {
  searchParams: {
    query?: string;
    filter?: string;
    page?: string | number;
  };
};

const Page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = searchParams;
  const { } = await getAllVideos(
    query,
    filter,
    Number(page) || 1
  );
  return (
    <main className="wrapper page">
      <Header title="All videos" subheader="Public Library" />
      {/* Example: Render videos */}
      {/* <div>
        {videos.map((video: any) => (
          <div key={video.id}>{video.title}</div>
        ))}
      </div> */}
    </main>
  );
};

export default Page;
