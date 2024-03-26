import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

export default function SignOutPage() {
  return (
    <form action={signOut}>
      <Button size="sm">
        Sign Out
      </Button>
    </form>
  )
}
