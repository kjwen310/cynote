import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth/get-current-user';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getCurrentUser();

  if (data?.user) {
    redirect('/workspace');
  }

  return (
    <main
      className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: 'url(/landing_1.svg)' }}
    >
      {children}
    </main>
  );
}
