import { Collaborator, LOG_TYPE } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterSelectProps {
  collaborators: Collaborator[];
  setSelectedType: (type: LOG_TYPE) => void;
  setSelectedCollaborator: (id: string) => void;
}

export function FilterSelect({
  collaborators,
  setSelectedType,
  setSelectedCollaborator,
}: FilterSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Select onValueChange={(val) => setSelectedType(val as LOG_TYPE)}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="WORkSPACE">Workspace</SelectItem>
            <SelectItem value="NOTE">Note</SelectItem>
            <SelectItem value="TASK_BOARD">Task Board</SelectItem>
            <SelectItem value="TASK_LIST">Task List</SelectItem>
            <SelectItem value="TASK_CARD">Task Card</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(val) => setSelectedCollaborator(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Collaborator" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Collaborators</SelectItem>
            {collaborators.map((collaborator) => (
              <SelectItem key={collaborator.id} value={collaborator.id}>
                {collaborator.displayName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
