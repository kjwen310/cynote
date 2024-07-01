import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { db } from '@/lib/prisma/db';
import { NavSidebar } from '@/components/workspace-nav/nav-sidebar';

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
    <div className="h-full">
      <div className="fixed z-20 flex flex-col h-full w-[72px] inset-y-0">
        <NavSidebar workspaces={workspaces} user={user} />
      </div>
      <main className="pl-[72px] h-full">
        {children}
      </main>
    </div>
  );
}
