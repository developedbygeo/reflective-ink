import { LuMenu } from 'react-icons/lu';

import { WithChildren } from '@/types/UI';
import navigationLinks from '@/data/navigationLinks';

import { Button } from '@/components/UI/Button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/UI/Sheet';
import NavLink from '@/components/UI/NavLink';

const DashboardSidebar = ({ children }: WithChildren) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="border-0 absolute top-4 left-4 [state=open]:opacity-0 [state=closed]:opacity-100 transition-opacity duration-200"
          variant="outline"
        >
          <div className="h-8 w-8">
            <LuMenu className="w-full h-full text-gray-300" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Where off to next?</SheetTitle>
          <SheetDescription>
            Ready to embark on an AI-powered adventure?
          </SheetDescription>
        </SheetHeader>
        <ul className="mt-12 h-[80vh] flex flex-col gap-y-5">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <NavLink
                  className="flex text-gray-400 items-center transition-colors gap-4"
                  activeClassName="text-white"
                  href={link.href}
                >
                  <Icon className="w-6 h-6" />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <SheetFooter>Not yet ready? Logout</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebar;
