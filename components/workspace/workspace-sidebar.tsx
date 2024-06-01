import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';
import { WorkspaceHeader } from './workspace-header';

interface WorkspaceSidebarProps {
  workspaceId: string;
}

export const WorkspaceSidebar = async ({
  workspaceId,
}: WorkspaceSidebarProps) => {
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
      workspaceId,
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

  if (!workspace || collaborators.length !== 1) {
    redirect('/');
  }

  const role = collaborators[0].role;

  return (
    <div className="flex flex-col w-full h-full text-primary bg-[#f2f3f5] dark:bg-[#2b2d31]">
      <WorkspaceHeader role={role} workspace={workspace} />
    </div>
  );
};
