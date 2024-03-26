import { redirect } from 'next/navigation';
import { getCurrentUser } from'@/actions/auth';

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data } = await getCurrentUser();
  

  if (data?.user) {
    redirect('/');
  }

  return (
    <>
      {children}
    </>
  );
};
