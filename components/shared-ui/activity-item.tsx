import { format } from 'date-fns';
import { HistoryLog } from '@prisma/client';
import { genLogMessage } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ActivityItemProps {
  log: HistoryLog;
}

export const ActivityItem = ({ log }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={log.collaboratorImage} />
      </Avatar>
      <div className="flex flex-col space-y-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-neutral-700">
            {log.collaboratorName}
          </span>{' '}
          {genLogMessage(log)}
        </p>
        <p className="text-sm text-muted-foreground">
          {format(new Date(log.createdAt), 'MMMM d yyyy h:mm')}
        </p>
      </div>
    </li>
  );
};
