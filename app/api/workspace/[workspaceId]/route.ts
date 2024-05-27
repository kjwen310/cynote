import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';

export async function GET(
  request: Request,
  { params }: { params: { workspaceId: string } }
) {
  const { workspaceId } = params;

  try {
    const { data: userData } = await getCurrentUser();
    const authUser = userData?.user || null;

    if (!authUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        collaborators: true,
      },
    });

    return NextResponse.json(workspace);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}