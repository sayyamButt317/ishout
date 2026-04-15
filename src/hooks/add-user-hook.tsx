import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; // adjust to your axios path

type AddUserPayload = {
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  password: string;
  role: 'admin' | 'company';
};

async function addUser(payload: AddUserPayload) {
  const { data } = await axios.post('/admin/users', payload);
  return data;
}

export default function AddUserHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
    },
  });
}