import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';

export async function GET(
  request: Request,
  { params }: { params: { cardId: string, workspaceId: string } }
) {
  const { cardId, workspaceId } = params;

  try {
    const { data: userData } = await getCurrentUser();
    const authUser = userData?.user || null;

    if (!authUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const taskCard = await db.taskCard.findUnique({
      where: {
        id: cardId,
        taskList: {
          taskBoard: {
            workspaceId,
          },
        },
      },
      include: {
        taskList: {
          select: {
            title: true,
          }
        }
      }
    });

    return NextResponse.json(taskCard);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
