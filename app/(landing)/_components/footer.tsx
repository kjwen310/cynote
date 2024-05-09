import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed w-full flex items-center border-t bg-slate-100 bottom-0 p-4">
      <div className="mx-auto flex items-center w-full justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Services
          </Button>
        </div>
      </div>
    </div>
  )
}
