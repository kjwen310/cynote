'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';

export async function createWorkspace(data: {
  title: string;
  description: string;
}) {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser || !authUser.email) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    redirect('/sign-in');
  }

  const workspace = await db.workspace.create({
    data: {
      title: data.title,
      description: data.description,
      image: '',
    },
  });

  const collaborator = await db.collaborator.create({
    data: {
      displayName: user.name || '',
      displayImage: user.avatarImg || '',
      role: 'OWNER',
      userId: user.id,
      workspaceId: workspace.id,
    },
  });

  await db.workspace.update({
    where: {
      id: workspace.id,
    },
    data: {
      collaborators: {
        connect: {
          id: collaborator.id,
        },
      },
    },
  });

  return JSON.stringify(workspace.id);
}
