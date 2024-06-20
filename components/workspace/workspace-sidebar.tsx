import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkspaceHeader } from './workspace-header';
import { WorkspaceSectionHeader } from './workspace-section-header';
import { WorkspaceSectionItem } from './workspace-section-item';
import { WorkspaceCollaborator } from './workspace-collaborator';

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

  const isOwner = collaborator.role === "OWNER";

  return (
    <div className="flex flex-col w-full h-full text-primary bg-[#f2f3f5] dark:bg-[#2b2d31]">
      <WorkspaceHeader currentCollaboratorId={collaborator.id} isOwner={isOwner} workspace={workspace} />
      <ScrollArea className="flex-1 space-y-2 px-4">
        <div>
          <WorkspaceSectionHeader
            workspace={workspace}
            currentCollaboratorId={collaborator.id}
            actionType="manage"
            modalType="workspaceCollaborator"
            label="Collaborators"
            isOwner={isOwner}
          />
          <div className="space-x-2">
            {!!workspace.collaborators.length &&
              workspace.collaborators.map((collaborator) => (
                <WorkspaceCollaborator
                  key={collaborator.id}
                  collaborator={collaborator}
                />
              ))}
          </div>
        </div>
        <div>
          <WorkspaceSectionHeader
            workspace={workspace}
            modalType="taskBoardCreate"
            label="Task Boards"
            isOwner={isOwner}
          />
          <div className="space-y-[2px]">
            {workspace.taskBoards.length ? (
              workspace.taskBoards.map((taskBoard) => (
                <WorkspaceSectionItem
                  key={taskBoard.id}
                  type="taskBoard"
                  workspace={workspace}
                  item={taskBoard}
                  isOwner={isOwner}
                />
              ))
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-300">
                -- No task boards --
              </p>
            )}
          </div>
        </div>
        <div>
          <WorkspaceSectionHeader
            workspace={workspace}
            modalType="noteCreate"
            label="Notes"
            isOwner={isOwner}
          />
          <div className="space-y-[2px]">
            {workspace.notes.length ? (
              workspace.notes.map((note) => (
                <WorkspaceSectionItem
                  key={note.id}
                  type="note"
                  workspace={workspace}
                  currentCollaboratorId={collaborator.id}
                  item={note}
                  isOwner={isOwner}
                />
              ))
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-300">
                -- No notes --
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
