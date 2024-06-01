'use client';

import { Trash } from 'lucide-react';
import { deleteWorkspaceCollaborator } from '@/actions/workspace/delete-workspace-collaborator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Collaborator } from '@prisma/client';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '@/components/dialog-modal';
import { Button } from '@/components/ui/button';

export const WorkspaceCollaboratorModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceCollaborator' && isOpen;
  const { toast } = useToast();

  const { workspace } = data;
  const { collaborators } = workspace || {};

  const { execute } = useAction(deleteWorkspaceCollaborator, {
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
  });

  const onSubmit = (collaboratorId: string) => {
    if (!workspace) return;
  
    execute({
      workspaceId: workspace.id,
      collaboratorId,
    });
  };

  const modalBody = (
    <ScrollArea className="max-h-[400px]">
      {collaborators &&
        collaborators.map((d: Collaborator) => (
          <div key={d.id} className="flex items-center gap-x-2 mb-6">
            <Avatar className="w-8 h-8">
              <AvatarImage src={d.displayImage} />
              <AvatarFallback>{d.displayName}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-semibold">{d.displayName}</div>
            <div className="flex items-center gap-x-4 ml-auto">
              <div className="text-sm font-semibold capitalize">{d.role}</div>
              {d.role !== 'OWNER' && (
                <form action={() => onSubmit(d.id)}>
                  <Button
                    type="submit"
                    variant="ghost"
                    className="outline-none text-rose-500"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </form>
              )}
            </div>
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
