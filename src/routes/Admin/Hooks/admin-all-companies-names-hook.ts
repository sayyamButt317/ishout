import { useQuery } from '@tanstack/react-query';
import { AdminAllCompaniesNamesApi } from '@/src/routes/Admin/API/admin.routes';

export default function useAdminAllCompaniesNamesHook() {
  return useQuery({
    queryKey: ['admin-all-companies-names'],
    queryFn: () => AdminAllCompaniesNamesApi(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
