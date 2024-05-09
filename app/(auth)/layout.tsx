import { redirect } from 'next/navigation';
import { getCurrentUser } from'@/actions/auth';
import { Navbar } from "./_components/navbar";

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data } = await getCurrentUser();
  

  if (data?.user) {
    redirect('/workspace');
  }

  return (
    <div className=" bg-slate-200">
      <Navbar />
      <main className="flex justify-center items-center w-full h-screen">
        {children}
      </main>
    </div>
  );
};
