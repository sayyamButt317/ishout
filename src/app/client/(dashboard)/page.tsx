import PageHeader from '@/src/app/component/PageHeader';
import { LayoutDashboard } from 'lucide-react';
import { ComingSoon } from '../../component/comingsoon';

export default function ClientDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard Home"
        description="Welcome to your dashboard"
        icon={<LayoutDashboard className="size-5" />}
      />
      <div>
    </div>
    </div>
  );
}
