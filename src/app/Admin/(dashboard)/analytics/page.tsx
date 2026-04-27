import PageHeader from '@/src/app/component/PageHeader';
import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Campaign and performance insights"
        icon={<BarChart3 className="size-5" />}
      />
    </div>
  );
}
