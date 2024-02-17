import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async (props: PageProps) => {
  return (
    <main className="container relative">
      
    </main>
  )
}
export default Page;