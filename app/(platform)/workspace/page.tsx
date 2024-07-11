import { Check } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateWorkspaceBtn } from './_components/create-workspace-btn';

export default function WorkspacePage() {
  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: 'url(/images/landing_1.svg)' }}
    >
      <div className='fixed w-full h-screen bg-slate-700/70' />
      <Card className="relative z-50 text-center shadow-xl max-w-[320px] mx-4 md:w-[400px] md:max-w-none md:mx-0">
        <CardHeader className="space-y-4">
          <CardTitle>Not have a workspace yet?</CardTitle>
          <CardDescription>Create your own one and explore!</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-y-2 font-semibold text-sm text-left text-indigo-400 p-4">
            <li className="flex justify-center items-center gap-x-2">
              <Check className="w-4 h-4" />
              <p>Share ideas with flexible notes</p>
            </li>
            <li className="flex justify-center items-center gap-x-2">
              <Check className="w-4 h-4" />
              <p>Manage tasks with task boards</p>
            </li>
            <li className="flex justify-center items-center gap-x-2">
              <Check className="w-4 h-4" />
              <p>United people with workspaces</p>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          <CreateWorkspaceBtn />
        </CardFooter>
      </Card>
    </div>
  );
}
