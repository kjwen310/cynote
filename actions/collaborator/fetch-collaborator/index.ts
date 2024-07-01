'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/utils';
import { FetchCollaboratorSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    redirect('/sign-in');
  }

  const { workspaceId } = data;
  let collaborators = [];

  try {
    collaborators = await db.collaborator.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    return { error: '[FETCH_COLLABORATOR]: Failed fetch' };
  }

  return {
    data: collaborators,
  };
};

export const fetchCollaborator = createSafeAction(
  FetchCollaboratorSchema,
  handler
);
