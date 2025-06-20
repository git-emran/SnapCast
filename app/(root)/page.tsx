import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { getAllVideos } from "@/lib/actions/video";
import React from "react";

interface SearchParams {
  searchParams: {
    query?: string;
    filter?: string;
    page?: string | number;
  };
}

const Page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = searchParams;
  const { videos, pagination } = await getAllVideos(
    query,
    filter,
    Number(page) || 1
  );
  return (
    <main className="wrapper page">
      <Header title="All videos" subheader="Public Library" />

      {videos?.length > 0 ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              {...video}
              userImg={user?.image || ""}
              username={user?.name || "Guest"}
              thumbnail={video.thumbnailUrl}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos Found"
          description="Try Adjusting your search"
        />
      )}
    </main>
  );
};

export default Page;
