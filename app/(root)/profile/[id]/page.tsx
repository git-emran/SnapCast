
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { getAllVideosByUser } from "@/lib/actions/video";
import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";

type ParamWithSearch = {
  params: {
    id: string;
    [key: string]: string; // This allows for additional search parameters
  };
};

const Page = async ({ params, searchParams }: ParamWithSearch) => {
  const { id } = params;
  const { query, filter } = await searchParams;

  const { user, videos } = await getAllVideosByUser(id, query, filter);

  if(!user) notFound()

  return (
    <div className="wrapper page">
      <Header
        subheader={user?.email}
        title={user?.name}
        userImg={user?.image ?? ""}
      />
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
          title="No Videos Available Yet"
          description="Videos will show up once you upload them"
        />
      )}
    </div>
  );
};

export default Page;
