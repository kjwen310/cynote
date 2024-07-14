import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { db } from '@/lib/prisma/db';
import { checkSubscription } from '@/lib/stripe/subscription';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { noteLimit, taskBoardLimit } from '@/constant/none-subscription-limit';

import Loading from '@/components/shared-ui/loading';
import { WorkspaceSidebar } from './_components/workspace-sidebar';
import { MobileSidebarTrigger } from '../../_components/nav-sidebar/mobile-sidebar-trigger';

interface WorkspaceIdLayout {
  children: React.ReactNode;
  params: { workspaceId: string };
}

export async function generateMetadata({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { workspaceId } = params;
  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
    select: { title: true },
  });

  return {
    title: workspace?.title || 'workspace',
  };
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

  const isAdvance = await checkSubscription(workspaceId);
  const isOwner = collaborator.role === 'OWNER';

  const isReachTaskBoardLimit =
    !isAdvance && workspace.taskBoards.length >= taskBoardLimit;
  const isReachNoteLimit = !isAdvance && workspace.notes.length >= noteLimit;

  return (
    <div className="h-full">
      <div className="md:hidden">
        <MobileSidebarTrigger
          workspaces={workspaces}
          user={user}
          workspace={workspace}
          collaborator={collaborator}
          isOwner={isOwner}
          isAdvance={isAdvance}
          isReachTaskBoardLimit={isReachTaskBoardLimit}
          isReachNoteLimit={isReachNoteLimit}
        />
      </div>
      <div className="fixed z-20 hidden w-[240px] h-full flex-col inset-y-0 md:flex">
        <WorkspaceSidebar
          workspace={workspace}
          collaborator={collaborator}
          isOwner={isOwner}
          isAdvance={isAdvance}
          isReachTaskBoardLimit={isReachTaskBoardLimit}
          isReachNoteLimit={isReachNoteLimit}
        />
      </div>
      <main className="h-full md:pl-[240px]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
}
