import { redirect } from 'next/navigation';
import { getCurrentUser } from'@/actions/auth';
import { db } from '@/lib/db';

export default async function PlatformLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data } = await getCurrentUser();
  const authUser = data?.user || null;
  
  if (!authUser || !authUser.email) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    await db.user.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata.name || '',
        image: authUser.user_metadata.avatar_url || '',
      },
    })
  }

  return (
    <>
      {children}
    </>
  );
};
