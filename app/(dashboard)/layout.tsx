import { userButtonStyle } from '@/common/clerkStyling';
import ThemeToggle from '@/components/theme/ThemeToggle';
import DashboardSidebar from '@/components/modules/DashboardSidebar';
import { WithChildren } from '@/types/UI';
import { UserButton } from '@clerk/nextjs';

const Layout = ({ children }: WithChildren) => (
  <div className="min-h-[100vh] overflow-y-auto relative bg-darkGray">
    <header className="h-16 border-b flex items-center justify-end px-8 py-4 border-darkGray">
      <div className="flex gap-6">
        {/* <ThemeToggle /> */}
        <UserButton appearance={userButtonStyle} />
      </div>
    </header>
    <DashboardSidebar />
    {children}
  </div>
);

export default Layout;
