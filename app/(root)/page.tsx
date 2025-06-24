import Header from "@/components/Header";
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
  const { query, filter, page } = await searchParams;
  const {} = await getAllVideos(query, filter, Number(page) || 1);
  return (
    <main className="wrapper page">
      <Header title="All videos" subheader="Public Library" />
    </main>
  );
};

export default Page;
