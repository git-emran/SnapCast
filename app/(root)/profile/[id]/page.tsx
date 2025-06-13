import Header from "@/components/Header";

const Page = async ({ params }: ParamWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header subheader="emrn.hossn@gmail.com " title="Emran Web Dev" />
      USER ID: {id}
    </div>
  );
};

export default Page;
