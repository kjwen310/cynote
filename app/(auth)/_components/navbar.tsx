import Link from "next/link";
import { Logo } from "@/components/logo";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="w-full md:max-w-screen-2xl mx-auto">
        <Logo />
      </div>
    </div>
  );
};
