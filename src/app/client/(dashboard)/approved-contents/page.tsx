import PageHeader from '@/src/app/component/PageHeader';
import { CheckCircle } from 'lucide-react';

export default function ApprovedContentsPage() {
  return (
    <div>
      <PageHeader
        title="Contents"
        description="Manage your content and assets"
        icon={<CheckCircle className="size-5" />}
      />
    </div>
  );
}
