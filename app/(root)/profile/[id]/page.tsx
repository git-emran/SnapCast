

const Page = async ({ params }: ParamWithSearch) => {
    const {id} = await params 
  return (
    <div>USER ID: {id}</div>
  )
}

export default Page