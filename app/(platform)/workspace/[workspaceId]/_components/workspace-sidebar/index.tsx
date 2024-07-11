import { Collaborator } from '@prisma/client';

import { WorkspaceWithDetail } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Header } from './header';
import { SectionHeader } from './section-header';
import { SectionItem } from './section-item';
import { CollaboratorItem } from './collaborator-item';

interface WorkspaceSidebarProps {
  workspace: WorkspaceWithDetail;
  collaborator: Collaborator;
  isOwner: boolean;
}

export const WorkspaceSidebar = ({
  workspace,
  collaborator,
  isOwner,
}: WorkspaceSidebarProps) => {
  return (
    <div className="flex flex-col w-full h-full text-primary bg-[#f2f3f5] dark:bg-[#2b2d31]">
      <Header
        currentCollaboratorId={collaborator.id}
        isOwner={isOwner}
        workspace={workspace}
      />
      <ScrollArea className="flex-1 space-y-2 px-4">
        <div>
          <SectionHeader
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
                <CollaboratorItem
                  key={collaborator.id}
                  collaborator={collaborator}
                />
              ))}
          </div>
        </div>
        <div>
          <SectionHeader
            workspace={workspace}
            modalType="taskBoardCreate"
            label="Task Boards"
            isOwner={isOwner}
          />
          <div className="space-y-[2px]">
            {workspace.taskBoards.length ? (
              workspace.taskBoards.map((taskBoard) => (
                <SectionItem
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
          <SectionHeader
            workspace={workspace}
            modalType="noteCreate"
            label="Notes"
            isOwner={isOwner}
          />
          <div className="space-y-[2px]">
            {workspace.notes.length ? (
              workspace.notes.map((note) => (
                <SectionItem
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
