/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";

type ParamWithSearch = {
  params: {
    id: string;
    [key: string]: string; // This allows for additional search parameters
  };
};

const Page = async ({ params }: ParamWithSearch) => {
  const { id } = params;
  return (
    <div className="wrapper page">
      <Header
        subheader="emrn.hossn@gmail.com "
        title="Emran Web Dev"
        userImg="/assets/images/dummy.jpg"
      />
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </div>
  );
};

export default Page;
