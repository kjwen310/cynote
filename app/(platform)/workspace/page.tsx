import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateWorkspaceBtn } from '../_components/create-workspace-btn';
import { Check } from 'lucide-react';

export default function WorkspacePage() {
  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center bg-slate-400/20"
      style={{ backgroundImage: 'url(/landing_1.svg)' }}
    >
      <Card className="w-[240px] text-center shadow-xl md:w-[350px]">
        <CardHeader className="space-y-4">
          <CardTitle>Not have a workspace yet?</CardTitle>
          <CardDescription>Create your own one and explore!</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-y-2 font-semibold text-sm text-left text-indigo-400 p-4">
            <li className='flex justify-center items-center gap-x-2'>
              <Check className="w-4 h-4" />
              <p>Share ideas with flexible notes</p>
            </li>
            <li className='flex justify-center items-center gap-x-2'>
              <Check className="w-4 h-4" />
              <p>Manage tasks with task boards</p>
            </li>
            <li className='flex justify-center items-center gap-x-2'>
              <Check className="w-4 h-4" />
              <p>United people with workspaces</p>
            </li>
          </ul>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <CreateWorkspaceBtn />
        </CardFooter>
      </Card>
    </div>
  );
}
