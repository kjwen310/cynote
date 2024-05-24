import { NextResponse } from 'next/server';
import { v4 as uuidV4 } from "uuid";
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
      select: {
        inviteCode: true,
      },
    });

    return NextResponse.json(workspace);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
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

    const workspace = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        inviteCode: uuidV4(),
      },
    });

    return NextResponse.json(workspace);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
