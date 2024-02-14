import { AddUserAction } from "@/actions/user/user";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async (props: PageProps) => {
  const users = await AddUserAction({})
  console.log(users)
  return (
    <main className="">
      <h1>Food</h1>
    </main>
  )
}
export default Page;