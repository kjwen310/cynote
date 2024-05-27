import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { db } from '@/lib/db';
import { Sidebar } from './_components/sidebar';
import { MobileSidebar } from './_components/mobile-sidebar';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getCurrentUser();
  const authUser = data?.user || null;

  if (!authUser || !authUser.email) {
    redirect('/sign-in');
  }

  let user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata.name || '',
        avatarImg: authUser.user_metadata.avatar_url || '',
      },
    });
  }

  const collaborators = await db.collaborator.findMany({
    where: {
      userId: user.id,
    },
    select: {
      workspaceId: true,
    },
  });

  const workspaceIds = collaborators.map(
    (collaborator) => collaborator.workspaceId
  );

  const workspaces = await db.workspace.findMany({
    where: {
      id: {
        in: workspaceIds,
      },
    },
  });

  return (
    <div>
      <MobileSidebar workspaces={workspaces} user={user} />
      {children}
    </div>
  );
}
