import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { db } from '@/lib/db';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getCurrentUser();
  const authUser = data?.user || null;

  if (!authUser || !authUser.email) {
    redirect('/sign-in');
  }

  let user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata.name || '',
        avatarImg: authUser.user_metadata.avatar_url || '',
      },
    });
  }

  const collaborators = await db.collaborator.findMany({
    where: {
      userId: user.id,
    },
  });

  const workspaceIds = collaborators.map((collaborator) => collaborator.workspaceId);

  const workspaces = await db.workspace.findMany({
    where: {
      id: {
        in: workspaceIds,
      },
    },
  });

  return (
    <div>
      <Navbar workspaces={workspaces} />
      <main className="max-w-6xl mx-auto px-4 pt-20 md:pt-24 xl:max-w-screen-xl">
        <div className="flex gap-x-7">
          <div className="hidden shrink-0 w-64 md:block">
            <Sidebar workspaces={workspaces} />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
