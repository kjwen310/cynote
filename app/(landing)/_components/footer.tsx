import { Logo } from '@/components/shared-ui/logo';
import { Icons } from '@/components/shared-ui/Icon';

export const Footer = () => {
  return (
    <footer className="px-2 py-4 dark:bg-slate-800">
      <div className="flex items-center justify-between w-full mx-auto max-w-screen-xl p-2 md:p-6">
        <div className="flex items-center gap-x-8">
          <div className="hidden md:block">
            <Logo />
          </div>
          <span className="text-sm text-slate-500 md:text-center dark:text-slate-400">
            © 2024 Cynote. All Rights Reserved.
          </span>
        </div>
        <ul className="flex flex-wrap items-center gap-x-2 text-slate-500 dark:text-slate-400 md:gap-x-4">
          <li>
            <a
              href="https://github.com/kjwen310/cynote"
              className="hover:opacity-75"
            >
              <Icons.gitHub className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kj-wen-794930189"
              className="hover:opacity-75"
            >
              <Icons.linkedIn className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
