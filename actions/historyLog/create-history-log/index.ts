import { getCurrentUser } from '@/actions/auth/get-current-user';
import { db } from '@/lib/db';
import { LOG_ACTION, LOG_TYPE } from '@prisma/client';

interface CreateHistoryLogProps {
  upperTargetId?: string;
  targetId: string;
  workspaceId: string;
  title: string;
  action: LOG_ACTION;
  type: LOG_TYPE;
}

export const createHistoryLog = async ({
  upperTargetId,
  targetId,
  workspaceId,
  title,
  action,
  type,
}: CreateHistoryLogProps) => {
  try {
    const { data } = await getCurrentUser();
    const authUser = data?.user || null;
    const collaborators = await db.collaborator.findMany({
      where: {
        userId: authUser?.id,
        workspaceId,
      },
    });

    if (!collaborators[0] || collaborators.length > 1 || !workspaceId) {
      throw new Error('User not found');
    }

    const collaborator = collaborators[0];

    await db.historyLog.create({
      data: {
        collaboratorId: collaborator.id,
        collaboratorImage: collaborator.displayImage,
        collaboratorName: collaborator.displayName,
        upperTargetId,
        targetId,
        workspaceId,
        title,
        action,
        type,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
