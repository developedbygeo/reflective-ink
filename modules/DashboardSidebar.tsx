import { LuMenu } from 'react-icons/lu';
import { ImMenu } from 'react-icons/im';

import { Button } from '@/components/UI/Button';
import { Label } from '@/components/UI/Label';
import { Input } from '@/components/UI/input';
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
import { WithChildren } from '@/types/UI';

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebar;
