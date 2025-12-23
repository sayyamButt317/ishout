"use client";
import { Button } from "@/components/ui/button";
import { UserStatus } from "@/src/app/component/custom-component/user-status";
import TableComponent from "@/src/app/component/CustomTable";
import AllUsersHook from "@/src/routes/Admin/Hooks/allusers-hook";
import UpdateUserStatusHook from "@/src/routes/Admin/Hooks/update-userstatus-hook";
import { UserManagementResponse } from "@/src/types/Admin-Type/usermanagment.type";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function UserManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = AllUsersHook(currentPage);
  const updateUserStatus = UpdateUserStatusHook();
  console.log(data);

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="italic text-2xl font-bold text-white">
              Company Generated Campaigns
            </h1>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => {
                refetch();
              }}
              disabled={isRefetching}
            >
              <RefreshCcw
                className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
                  isRefetching ? "animate-spin" : ""
                }`}
              />
            </Button>
          </div>
          <p className="italic text-xs text-slate-200 mt-2">
            {/* Showing {campaigns?.length} of {totalCount} campaigns */}
          </p>
        </div>

        {/* <div className="flex items-center gap-3">
              <label
                htmlFor="campaign-status-filter"
                className="text-sm text-white/80"
              >
                Filter by status
              </label>
              <select
                id="campaign-status-filter"
                value={statusFilter}
                onChange={handleStatusChange}
                className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-primaryButton"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div> */}
      </div>

      <TableComponent
        header={[
          "Company Name",
          "contact Person",
          "Email",
          "Phone",
          "Status",
          "Created At",
        ]}
        subheader={data?.users?.map((user: UserManagementResponse) => [
          <div key={`company-name-${user.user_id}`} className="truncate">
            {user?.company_name}
          </div>,
          <div key={`contact-person-${user.user_id}`} className="truncate">
            {user?.contact_person}
          </div>,
          <div key={`email-${user.user_id}`} className="truncate">
            {user?.email}
          </div>,
          <div key={`phone-${user.user_id}`} className="truncate">
            {user?.phone}
          </div>,
          <div key={`created-at-${user.user_id}`} className="truncate">
            {new Date(user.created_at).toLocaleDateString()}
          </div>,
          <div
            key={`status-${user.user_id}`}
            className="truncate flex items-center justify-center"
          >
            <UserStatus
              status={user.status}
              updateStatus={(status: string) => {
                updateUserStatus.mutate({
                  user_id: user.user_id,
                  status: status,
                });
              }}
            />
          </div>,
        ])}
        paginationstart={data?.page ?? currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
