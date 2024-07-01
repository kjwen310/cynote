import { getCurrentUser } from '@/actions/auth/get-current-user';
import { db } from '@/lib/prisma/db';
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
    const authUser = data?.user || null

    const user = await db.user.findUnique({
      where: {
        id: authUser?.id,
      },
    });

    if (!authUser || !user) {
      return {
        error: 'UnAuthorized',
      };
    }
  
    const collaborator = await db.collaborator.findUnique({
      where: {
        userId_workspaceId: {
          userId: authUser.id,
          workspaceId,
        },
      },
    });

    if (!collaborator || !workspaceId) {
      throw new Error('Collaborator not found');
    }

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
