import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';

export async function GET(
  request: Request,
  { params }: { params: { cardId: string; workspaceId: string } }
) {
  const { cardId, workspaceId } = params;

  try {
    const { data: userData } = await getCurrentUser();
    const authUser = userData?.user || null;

    if (!authUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const historyLogs = await db.historyLog.findMany({
      where: {
        workspaceId,
        targetId: cardId,
        type: 'TASK',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

    return NextResponse.json(historyLogs);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
