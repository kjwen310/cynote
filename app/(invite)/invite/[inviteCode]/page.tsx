import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { db } from '@/lib/prisma/db';

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const { inviteCode } = params;

  if (!inviteCode) {
    redirect('/');
  }

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

  const workspace = await db.workspace.findFirst({
    where: {
      inviteCode,
    },
  });

  if (!workspace) {
    redirect('/');
  }

  const collaborator = await db.collaborator.findFirst({
    where: {
      userId: user.id,
      workspaceId: workspace.id,
    },
  });

  if (!collaborator) {
    await db.workspace.update({
      where: {
        inviteCode,
      },
      data: {
        collaborators: {
          create: {
            displayName: user.name || '',
            displayImage: user.avatarImg || '',
            userId: user.id,
          },
        },
      },
    });
  }

  redirect(`/workspace/${workspace.id}`);
}
