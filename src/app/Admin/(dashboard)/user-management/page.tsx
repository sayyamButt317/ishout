'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserStatus } from '@/src/app/component/custom-component/user-status';
import TableComponent from '@/src/app/component/CustomTable';
import AllUsersHook from '@/src/routes/Admin/Hooks/allusers-hook';
import DeleteUserHook from '@/src/routes/Admin/Hooks/delete-user-hook';
import UpdateUserStatusHook from '@/src/routes/Admin/Hooks/update-userstatus-hook';
import CompanyUpdateProfileHook from '@/src/routes/Company/api/Hooks/update-profile.hook';
import { UserManagementResponse } from '@/src/types/Admin-Type/usermanagment.type';
import { RefreshCcw, Trash, Pencil, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input';
import { normalizePhoneNumberForDisplay, removePlusPrefix } from '@/src/utils/phone.utils';

type EditableUser = UserManagementResponse & {
  password?: string; 
};

type UpdateUserPayload = {
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  password?: string;
};

export default function UserManagementPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<EditableUser | null>(null);

  const { data, isLoading, refetch, isRefetching } = AllUsersHook(currentPage);
  const deleteUserHook = DeleteUserHook();
  const updateUserStatus = UpdateUserStatusHook();

  const { mutate: updateProfile, isPending: isUpdating } = CompanyUpdateProfileHook(
    selectedUser?.user_id || '',
  );

  const closeModal = () => {
    setSelectedUser(null);
    setShowPassword(false);
  };

  const openEditModal = (user: UserManagementResponse) => {
    setSelectedUser({ ...user, password: '' });
    setShowPassword(false);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">User Management</h1>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCcw
                className={`mt-5 w-4 h-4 text-primary-text ${
                  isRefetching ? 'animate-spin' : ''
                }`}
              />
            </Button>
          </div>

          <p className="italic text-xs text-slate-200 mt-2">
            Showing {data?.users?.length} of {data?.total} users
          </p>
        </div>
      </div>

      {/* Table */}
      <TableComponent
        header={[
          'Company Name',
          'Contact Person',
          'Email',
          'Phone',
          'Delete',
          'Edit',
          'Role',
          'Status',
        ]}
        subheader={data?.users?.map((user: UserManagementResponse) => [
          <div key={`company-${user.user_id}`} className="truncate">
            {user.company_name}
          </div>,
          <div key={`contact-${user.user_id}`} className="truncate">
            {user.contact_person}
          </div>,
          <div key={`email-${user.user_id}`} className="truncate">
            {user.email}
          </div>,
          <div key={`phone-${user.user_id}`} className="truncate">
            {user.phone}
          </div>,
          <div key={`delete-${user.user_id}`}>
            <Button
              variant="ghost"
              size="icon"
              disabled={deleteUserHook.isPending}
              onClick={() => deleteUserHook.mutate(user.user_id)}
            >
              <Trash className="size-5 text-red-300" />
            </Button>
          </div>,
          <div key={`edit-${user.user_id}`}>
            <Button variant="ghost" size="icon" onClick={() => openEditModal(user)}>
              <Pencil className="size-5 text-blue-400" />
            </Button>
          </div>,
          <div key={`role-${user.user_id}`} className="truncate">
            {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
          </div>,
          <div
            key={`status-${user.user_id}`}
            className="flex items-center justify-start"
          >
            <UserStatus
              status={user.status}
              updateStatus={(status: string) =>
                updateUserStatus.mutate({ user_id: user.user_id, status })
              }
            />
          </div>,
        ])}
        paginationstart={data?.page ?? currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => setCurrentPage(page)}
        isLoading={isLoading}
      />

      {/* Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto pt-20 px-4">
          <Card className="w-full max-w-2xl rounded-2xl shadow-xl border border-white/10 bg-neutral-900/80 backdrop-blur">
            <CardContent className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={closeModal}
              >
                <X className="w-5 h-5 text-white" />
              </Button>

              <h1 className="text-2xl font-semibold text-white mb-2">Edit User</h1>

              <p className="italic text-xs text-slate-200 mb-6">
                Update user information and contact details
              </p>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();

                  const payload: UpdateUserPayload = {
                    company_name: selectedUser.company_name,
                    contact_person: selectedUser.contact_person,
                    phone: removePlusPrefix(selectedUser.phone),
                    email: selectedUser.email,
                  };

                  if (selectedUser.password?.trim()) {
                    payload.password = selectedUser.password; 
                  }

                  updateProfile(payload, {
                    onSuccess: () => {
                      closeModal();
                      refetch();
                    },
                  });
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Person */}
                  <div>
                    <label className="block mb-1 text-neutral-300">Contact Person</label>
                    <Input
                      value={selectedUser.contact_person}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          contact_person: e.target.value,
                        })
                      }
                      className="h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton w-full"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-1 text-neutral-300">Phone Number</label>
                    <PhoneInput
                      international
                      defaultCountry="AE"
                      countryCallingCodeEditable={false}
                      placeholder="Enter phone number"
                      value={normalizePhoneNumberForDisplay(selectedUser.phone)}
                      onChange={(value) =>
                        setSelectedUser({
                          ...selectedUser,
                          phone: removePlusPrefix(value),
                        })
                      }
                      className="admin-phone-input"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block mb-1 text-neutral-300">Company Name</label>
                    <Input
                      value={selectedUser.company_name}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          company_name: e.target.value,
                        })
                      }
                      className="h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton w-full"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-1  text-neutral-300">Email</label>
                    <Input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                      className="h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton w-full"
                    />
                  </div>

                  {/* 2. Updated Password Field Styling and Logic */}
                  <div className="md:col-span-2">
                    <label className="text-neutral-300 text-sm mb-1 block">
                      Set New Password (Leave empty to keep current)
                    </label>

                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="new-password" // Prevents browser from auto-filling saved passwords
                        value={selectedUser?.password || ''}
                        onChange={(e) =>
                          setSelectedUser((prev) =>
                            prev ? { ...prev, password: e.target.value } : null,
                          )
                        }
                        // Added 'bg-neutral-950' and ensured no 'bg-white' exists
                        className="h-11 bg-neutral-950 border-white/10 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-secondaryButton w-full pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="bg-secondaryButton text-white"
                    disabled={isUpdating}
                  >
                    {isUpdating ? <Loader2 className="animate-spin" /> : 'Save'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
