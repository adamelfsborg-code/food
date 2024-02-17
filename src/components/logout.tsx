import { Button } from "@/components/ui/button"
import { LogoutUserAction } from "@/actions/user/user"
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

export function Logout() {
  const { toast } = useToast()
  
  async function onSubmit() {
    const response = await LogoutUserAction()


    toast({
      className: cn(
        'top-0 text-center flex fixed md:max-w-[420px] md:top-4 md:right-4'
      ),
      description: response.message,
    });

  }

  return (
    <>
      <Button variant='outline' onClick={onSubmit}>Logout</Button>
    </>
  )
}
