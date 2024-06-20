'use client';

import { format } from 'date-fns';
import { ShieldAlert, ShieldCheck, Trash } from 'lucide-react';
import { updateWorkspaceCollaborator } from '@/actions/workspace/update-workspace-collaborator';
import { deleteWorkspaceCollaborator } from '@/actions/workspace/delete-workspace-collaborator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Collaborator, ROLE } from '@prisma/client';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '@/components/dialog-modal';
import { RoleOption } from './role-option';

const roleMap = {
  [ROLE.OWNER]: <ShieldCheck className="w-full h-full  text-indigo-500" />,
  [ROLE.MEMBER]: <ShieldAlert className="w-full h-full text-indigo-500" />,
};

export const WorkspaceCollaboratorModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceCollaborator' && isOpen;
  const { toast } = useToast();

  const { workspace, currentCollaboratorId } = data;
  const { collaborators } = workspace || {};

  const { execute: executeUpdateWorkspaceCollaborator } = useAction(
    updateWorkspaceCollaborator,
    {
      onSuccess: () => {
        toast({
          title: 'SUCCESS',
          description: 'Successfully Update collaborator role',
        });
      },
      onError: (error) => {
        toast({
          title: 'ERROR',
          description: 'Something went wrong',
        });
      },
      onFinally: onClose,
    }
  );

  const { execute: executeDeleteWorkspaceCollaborator } = useAction(
    deleteWorkspaceCollaborator,
    {
      onSuccess: () => {
        toast({
          title: 'SUCCESS',
          description: 'Successfully Delete collaborator',
        });
      },
      onError: (error) => {
        toast({
          title: 'ERROR',
          description: 'Something went wrong',
        });
      },
      onFinally: onClose,
    }
  );

  const onUpdateCollaborator = (collaboratorId: string, role: ROLE) => {
    if (!workspace) return;

    executeUpdateWorkspaceCollaborator({
      workspaceId: workspace.id,
      collaboratorId,
      role,
    });
  };

  const onDeleteCollaborator = (collaboratorId: string) => {
    if (!workspace) return;

    executeDeleteWorkspaceCollaborator({
      workspaceId: workspace.id,
      collaboratorId,
    });
  };

  const modalBody = (
    <ScrollArea className="max-h-[400px]">
      {collaborators &&
        collaborators.map((d: Collaborator) => (
          <div className="flex items-center gap-x-2">
            <div key={d.id} className="flex items-center gap-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={d.displayImage} />
                <AvatarFallback>{d.displayName}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <div key={d.id} className="flex items-center gap-x-2">
                  <p className="text-sm text-muted-foreground font-semibold text-neutral-700">
                    {d.displayName}
                  </p>
                  <div className="w-4 h-4">{roleMap[d.role]}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(d.createdAt), 'MMMM d yyyy h:mm')}
                </p>
              </div>
            </div>
            {currentCollaboratorId !== d.id && (
              <div className="flex items-center gap-x-2 ml-auto">
                <RoleOption
                  collaboratorId={d.id}
                  onUpdate={onUpdateCollaborator}
                />
                <Trash
                  className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-400 dark:text-zinc-400"
                  onClick={() => onDeleteCollaborator(d.id)}
                />
              </div>
            )}
          </div>
        ))}
    </ScrollArea>
  );

  if (!workspace || !collaborators) {
    return null;
  }

  return (
    <DialogModal
      title="Collaborator Settings"
      description={`${collaborators?.length || 0} collaborators`}
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
