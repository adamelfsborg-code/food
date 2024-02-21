import { Button } from "@/components/ui/button"
import { LogoutUserAction } from "@/actions/user"
import { useToast } from "../ui/use-toast";

export function Logout() {
  const { toast } = useToast()
  
  async function onSubmit() {
    const response = await LogoutUserAction()

    toast({
      description: response.message,
    });

  }

  return (
    <>
      <Button variant='outline' onClick={onSubmit}>Logout</Button>
    </>
  )
}
