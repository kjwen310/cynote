import { redirect } from 'next/navigation';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';

import { NavSidebar } from '../_components/nav-sidebar';
import { MobileSidebarTrigger } from '../_components/nav-sidebar/mobile-sidebar-trigger';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: { workspaceId: string | undefined };
}

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const { workspaceId } = params;

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
      {!workspaceId && (
        <div className="md:hidden">
          <MobileSidebarTrigger workspaces={workspaces} user={user} />
        </div>
      )}
      <div className="hidden fixed z-20 h-full w-[72px] inset-y-0 md:block">
        <NavSidebar workspaces={workspaces} user={user} />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
}
