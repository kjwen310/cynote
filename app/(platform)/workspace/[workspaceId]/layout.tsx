import { redirect } from 'next/navigation';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';

import { WorkspaceSidebar } from './_components/workspace-sidebar';
import { MobileSidebarTrigger } from '../../_components/nav-sidebar/mobile-sidebar-trigger';

interface WorkspaceIdLayout {
  children: React.ReactNode;
  params: { workspaceId: string };
}

export default async function WorkspaceIdLayout({
  children,
  params,
}: WorkspaceIdLayout) {
  const { workspaceId } = params;

  const { data } = await getCurrentUser();
  const authUser = data?.user || null;

  const user = await db.user.findUnique({
    where: {
      id: authUser?.id,
    },
  });

  if (!user || !authUser || !authUser.email) {
    redirect('/sign-in');
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

  if (!workspaceIds.includes(workspaceId)) {
    redirect('/');
  }

  const workspaces = await db.workspace.findMany({
    where: {
      id: {
        in: workspaceIds,
      },
    },
  });

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      collaborators: {
        orderBy: {
          role: 'asc',
        },
      },
      taskBoards: true,
      notes: true,
      historyLogs: true,
    },
  });

  if (!workspace || !collaborator) {
    redirect('/');
  }

  const isOwner = collaborator.role === 'OWNER';

  return (
    <div className="h-full">
      <div className="md:hidden">
        <MobileSidebarTrigger
          workspaces={workspaces}
          user={user}
          workspace={workspace}
          collaborator={collaborator}
          isOwner={isOwner}
        />
      </div>
      <div className="fixed z-20 hidden w-[240px] h-full flex-col inset-y-0 md:flex">
        <WorkspaceSidebar
          workspace={workspace}
          collaborator={collaborator}
          isOwner={isOwner}
        />
      </div>
      <main className="h-full md:pl-[240px]">{children}</main>
    </div>
  );
}
