import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { WorkspaceSidebar } from '@/components/workspace/workspace-sidebar';

interface WorkspaceIdLayout {
  children: React.ReactNode;
  params: { workspaceId: string };
}

export default async function WorkspaceIdLayout({
  children,
  params,
}: WorkspaceIdLayout) {
  const { workspaceId } = params;

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
    },
    select: {
      workspaceId: true,
    },
  });

  const workspaceIds = collaborators.map(
    (collaborator) => collaborator.workspaceId
  );

  if (!workspaceIds.includes(workspaceId)) {
    redirect('/');
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  if (!workspace) {
    redirect('/');
  }

  return (
    <div className="h-full">
      <div className="fixed z-20 hidden w-60 h-full flex-col inset-y-0 md:flex">
        <WorkspaceSidebar workspaceId={workspaceId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
