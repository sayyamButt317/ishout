import PageHeader from '@/src/app/component/PageHeader';
import { FileText } from 'lucide-react';

export default function ContentsPage() {
  return (
    <div>
      <PageHeader
        title="Contents"
        description="Manage your content and assets"
        icon={<FileText className="size-5" />}
      />
    </div>
  );
}
