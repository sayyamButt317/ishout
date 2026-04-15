'use client';

import { useState, useMemo, type ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import { UserStatus } from '@/src/app/component/custom-component/user-status';
import { WhatsAppShareButton } from '@/src/app/component/custom-component/whatsappshare';
import AllUsersHook from '@/src/routes/Admin/Hooks/allusers-hook';
import DeleteUserHook from '@/src/routes/Admin/Hooks/delete-user-hook';
import UpdateUserStatusHook from '@/src/routes/Admin/Hooks/update-userstatus-hook';
import CompanyUpdateProfileHook from '@/src/routes/Company/api/Hooks/update-profile.hook';
import AddUserHook from '@/src/hooks/add-user-hook';
import { UserManagementResponse } from '@/src/types/Admin-Type/usermanagment.type';
import {
  RefreshCcw, Trash, Pencil, X, Loader2, Eye, EyeOff,
  Users, Search, UserPlus, ShieldCheck,
  Activity, ChevronRight, Building2, Phone,
} from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input';
import {
  normalizePhoneNumberForDisplay,
  removePlusPrefix,
} from '@/src/utils/phone.utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'admin' | 'company';
type ModalMode = 'edit' | 'add';

type EditableUser = UserManagementResponse & { password?: string };

type UpdateUserPayload = {
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  password?: string;
};

type AddUserPayload = {
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
};

type CountryOption = { value?: string; label: string };
type FlagIconComponent = ComponentType<{ country: string; title: string; className?: string }>;

// ─── Mobile Country Select ────────────────────────────────────────────────────

function MobileCountrySelect({
  value, onChange, options, iconComponent: FlagIcon,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: FlagIconComponent;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        className="flex items-center gap-1 rounded px-1 py-0.5 hover:bg-white/10 cursor-pointer transition-colors">
        {value && <FlagIcon country={value} title={selectedLabel} />}
        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-200 flex items-end justify-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative z-10 w-full flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl mx-4 mb-4"
            style={{ maxHeight: '60vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2 border-b border-white/10">
              <span className="text-white font-semibold text-sm">Select Country</span>
              <button type="button" onClick={() => setOpen(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {options.filter((o) => o.value).map((option) => (
                <li key={option.value}>
                  <button type="button"
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${option.value === value ? 'bg-white/10 text-white font-medium' : 'text-neutral-300'}`}
                    onClick={() => { onChange(option.value); setOpen(false); }}>
                    <FlagIcon country={option.value!} title={option.label} />
                    <span>{option.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const emptyAddForm: AddUserPayload = { company_name: '', contact_person: '', phone: '', email: '', password: '', role: 'company' };

function getInitials(name: string) {
  return name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
}

function avatarGradient(id: string) {
  const gradients = [
    'from-pink-500 to-rose-600',
    'from-violet-500 to-indigo-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-fuchsia-500 to-purple-600',
  ];
  const idx = id ? id.charCodeAt(id.length - 1) % gradients.length : 0;
  return gradients[idx];
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, icon, accent, bar,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  accent: string;
  bar: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111114] p-5 flex flex-col gap-3">
      {/* top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-1">{label}</p>
          <p className={`text-5xl font-black leading-none tracking-tight ${accent}`}>{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.replace('text-', 'bg-').replace('-400', '-500/15').replace('-300', '-500/15')}`}>
          {icon}
        </div>
      </div>
      {/* sub */}
      <p className="text-xs text-white/40">{sub}</p>
      {/* bar */}
      <div className="h-3px rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.min((value / 20) * 100, 100)}%` }} />
      </div>
    </div>
  );
}

// ─── User Row Card ────────────────────────────────────────────────────────────

function UserRowCard({
  user,
  onEdit,
  onDelete,
  isDeleting,
  updateStatus,
}: {
  user: UserManagementResponse;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  updateStatus: (status: string) => void;
}) {
  const grad = avatarGradient(user.user_id);

  return (
    <div className="group flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/0.05 bg-white/0.02 hover:bg-white/0.05 hover:border-white/10 transition-all duration-200">

      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${grad} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg`}>
        {user.logo_url
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={user.logo_url} alt={user.contact_person} className="w-10 h-10 rounded-xl object-cover" />
          : getInitials(user.contact_person)}
      </div>

      {/* Name + ID */}
      <div className="min-w-130px shrink-0">
        <p className="text-sm font-semibold text-white leading-tight truncate">{user.contact_person}</p>
        <p className="text-[11px] text-white/30 mt-0.5 truncate">{user.email}</p>
      </div>

      {/* Company */}
      <div className="hidden md:flex items-center gap-1.5 min-w-140px shrink-0">
        <Building2 className="w-3.5 h-3.5 text-white/25 shrink-0" />
        <span className="text-sm text-white/60 truncate">{user.company_name}</span>
      </div>

      {/* Phone */}
      <div className="hidden lg:flex items-center gap-1.5 min-w-130px shrink-0">
        <Phone className="w-3.5 h-3.5 text-white/25 shrink-0" />
        <span className="text-xs font-mono text-white/50">{user.phone}</span>
      </div>

      {/* Role badge */}
      <div className="shrink-0">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
          user.role === 'admin'
            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
            : 'bg-violet-500/10 text-violet-400 border-violet-500/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-indigo-400' : 'bg-violet-400'}`} />
          {user.role === 'admin' ? 'Admin' : 'Company'}
        </span>
      </div>

      {/* Status toggle */}
      <div className="shrink-0 ml-auto">
        <UserStatus
          status={user.status}
          updateStatus={updateStatus}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <WhatsAppShareButton phone={user.phone} contactPerson={user.contact_person} />
        <button onClick={onEdit}
          className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={onDelete} disabled={isDeleting}
          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40">
          {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

// ─── Field component for modal ────────────────────────────────────────────────

function ModalField({
  label, value, onChange, placeholder, type = 'text', required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">{label}</label>
      <Input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 bg-[#0d0d10] border-white/10 text-white placeholder:text-white/20 focus:ring-1 focus:ring-pink-500/40 focus:border-pink-500/30 w-full rounded-xl"
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UserManagementPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState<ModalMode>('edit');
  const [selectedUser, setSelectedUser] = useState<EditableUser | null>(null);
  const [addForm, setAddForm] = useState<AddUserPayload>(emptyAddForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');

  const { data, isLoading, refetch, isRefetching } = AllUsersHook(currentPage);
  const deleteUserHook = DeleteUserHook();
  const updateUserStatus = UpdateUserStatusHook();
  const addUserHook = AddUserHook();

  const { mutate: updateProfile, isPending: isUpdating } = CompanyUpdateProfileHook(
    selectedUser?.user_id || '',
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allUsers: UserManagementResponse[] = data?.users ?? [];

  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        u.company_name?.toLowerCase().includes(q) ||
        u.contact_person?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.includes(q);
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [allUsers, search, roleFilter]);

  const stats = {
    total: allUsers.length,
    admins: allUsers.filter((u) => u.role === 'admin').length,
    active: allUsers.filter((u) => u.status === 'active').length,
  };

  const closeModal = () => { setModalOpen(false); setSelectedUser(null); setAddForm(emptyAddForm); setShowPassword(false); };

  const openEditModal = (user: UserManagementResponse) => {
    setModalMode('edit');
    setSelectedUser({ ...user, password: '' });
    setShowPassword(false);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setModalMode('add');
    setAddForm(emptyAddForm);
    setShowPassword(false);
    setModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    const payload: UpdateUserPayload = {
      company_name: selectedUser.company_name,
      contact_person: selectedUser.contact_person,
      phone: removePlusPrefix(selectedUser.phone),
      email: selectedUser.email,
    };
    if (selectedUser.password?.trim()) payload.password = selectedUser.password;
    updateProfile(payload, { onSuccess: () => { closeModal(); refetch(); } });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUserHook.mutate(
      { ...addForm, phone: removePlusPrefix(addForm.phone) },
      { onSuccess: () => { closeModal(); refetch(); } },
    );
  };

  return (
    <>
      {/* ── Header ── */}
      <PageHeader
        title="User Management"
        description={`${filteredUsers.length} of ${data?.total ?? 0} users`}
        icon={<Users className="size-5" />}
        actions={
          <div className="flex items-center gap-2">
            {/* ── ADD USER — redesigned button ── */}
            <button
              onClick={openAddModal}
              className="relative group flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #e8185c 0%, #c4144e 100%)', boxShadow: '0 4px 20px rgba(232,24,92,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}
            >
              {/* shine sweep */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }} />
              <span className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-white/20">
                <UserPlus className="w-3.5 h-3.5" />
              </span>
              <span className="relative">Add User</span>
              <ChevronRight className="relative w-3.5 h-3.5 opacity-60" />
            </button>

            <Button variant="ghost" size="icon"
              className="size-9 text-white/50 hover:bg-white/8 hover:text-white rounded-xl border border-white/0.06"
              onClick={() => refetch()} disabled={isRefetching} aria-label="Refresh">
              <RefreshCcw className={`size-4 ${isRefetching ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        }
      />

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-6">
        <StatCard
          label="Total Users"
          value={stats.total}
          sub={`+${Math.max(0, stats.total - 8)} this month`}
          icon={<Users className="w-5 h-5 text-pink-400" />}
          accent="text-pink-400"
          bar="bg-gradient-to-r from-pink-500 to-rose-500"
        />
        <StatCard
          label="Admins"
          value={stats.admins}
          sub="Restricted access"
          icon={<ShieldCheck className="w-5 h-5 text-indigo-400" />}
          accent="text-indigo-400"
          bar="bg-gradient-to-r from-indigo-500 to-violet-500"
        />
        <StatCard
          label="Active Now"
          value={stats.active}
          sub="Live sessions"
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
          accent="text-emerald-400"
          bar="bg-gradient-to-r from-emerald-500 to-teal-500"
        />
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col sm:flex-row gap-3 px-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or company…"
            className="w-full pl-10 pr-4 py-2.5 bg-[#111114] border border-white/[0.07] rounded-xl text-sm text-white placeholder:text-white/25 outline-none focus:border-pink-500/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-[#111114] border border-white/[0.07] rounded-xl p-1">
          {(['all', 'admin', 'company'] as const).map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                roleFilter === r
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/25'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}>
              {r === 'all' ? 'All' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── User list ── */}
      <div className="px-4">
        <div className="rounded-2xl border border-white/0.06 bg-[#0d0d10] overflow-hidden">
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_100px] gap-4 px-4 py-3 border-b border-white/0.05 bg-white/0.015">
            {['User', 'Company', 'Phone', 'Role', 'Status', 'Actions'].map((h) => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">{h}</p>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-white/30" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/25">
              <Users className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No users found</p>
            </div>
          ) : (
            <div className="p-3 flex flex-col gap-1.5">
              {filteredUsers.map((user) => (
                <UserRowCard
                  key={user.user_id}
                  user={user}
                  onEdit={() => openEditModal(user)}
                  onDelete={() => deleteUserHook.mutate(user.user_id)}
                  isDeleting={deleteUserHook.isPending}
                  updateStatus={(status) => updateUserStatus.mutate({ user_id: user.user_id, status })}
                />
              ))}
            </div>
          )}

          {/* Pagination footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/0.05">
            <p className="text-xs text-white/30">
              Showing <span className="text-white/60 font-medium">{filteredUsers.length}</span> of{' '}
              <span className="text-white/60 font-medium">{data?.total ?? 0}</span> users
            </p>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: data?.total_pages ?? 1 }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    p === currentPage
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : 'text-white/30 hover:bg-white/5 hover:text-white'
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closeModal} />

          {/* Panel */}
          <div className="relative w-full max-w-lg my-auto rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,24,92,0.08)' }}>

            {/* Top accent bar */}
            <div className="h-3px w-full" style={{ background: 'linear-gradient(90deg, #e8185c, #6366f1, #10b981)' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/0.06">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(232,24,92,0.12)', border: '1px solid rgba(232,24,92,0.2)' }}>
                  {modalMode === 'add'
                    ? <UserPlus className="w-4 h-4 text-pink-400" />
                    : <Pencil className="w-4 h-4 text-pink-400" />}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    {modalMode === 'add' ? 'Add New User' : 'Edit User'}
                  </h2>
                  <p className="text-[11px] text-white/35 mt-0.5">
                    {modalMode === 'add' ? 'Create a new account with role access' : 'Update user info and credentials'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={modalMode === 'add' ? handleAddSubmit : handleEditSubmit}>
              <div className="px-6 py-5 space-y-4">

                {/* Role selector — shown for both add and edit */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { value: 'company', label: 'Company', desc: 'Campaign access', color: 'violet' },
                      { value: 'admin', label: 'Admin', desc: 'Full platform access', color: 'indigo' },
                    ] as const).map((r) => {
                      const isSelected = modalMode === 'add'
                        ? addForm.role === r.value
                        : selectedUser?.role === r.value;
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() =>
                            modalMode === 'add'
                              ? setAddForm({ ...addForm, role: r.value })
                              : setSelectedUser(selectedUser ? { ...selectedUser, role: r.value } : null)
                          }
                          className={`relative flex flex-col items-start gap-0.5 p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? r.color === 'indigo'
                                ? 'bg-indigo-500/10 border-indigo-500/30 text-white'
                                : 'bg-violet-500/10 border-violet-500/30 text-white'
                              : 'bg-white/0.03 border-white/[0.07] text-white/40 hover:bg-white/0.06 hover:text-white/70'
                          }`}
                        >
                          {isSelected && (
                            <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${r.color === 'indigo' ? 'bg-indigo-400' : 'bg-violet-400'}`} />
                          )}
                          <span className="text-sm font-semibold">{r.label}</span>
                          <span className="text-[11px] opacity-60">{r.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Two-col fields */}
                <div className="grid grid-cols-2 gap-4">
                  <ModalField
                    label="Contact Person"
                    required
                    value={modalMode === 'add' ? addForm.contact_person : selectedUser?.contact_person ?? ''}
                    onChange={(v) => modalMode === 'add'
                      ? setAddForm({ ...addForm, contact_person: v })
                      : setSelectedUser(selectedUser ? { ...selectedUser, contact_person: v } : null)}
                    placeholder="e.g. Sara Ahmed"
                  />
                  <ModalField
                    label="Company Name"
                    required
                    value={modalMode === 'add' ? addForm.company_name : selectedUser?.company_name ?? ''}
                    onChange={(v) => modalMode === 'add'
                      ? setAddForm({ ...addForm, company_name: v })
                      : setSelectedUser(selectedUser ? { ...selectedUser, company_name: v } : null)}
                    placeholder="e.g. iShout Media"
                  />
                </div>

                <ModalField
                  label="Email"
                  required
                  type="email"
                  value={modalMode === 'add' ? addForm.email : selectedUser?.email ?? ''}
                  onChange={(v) => modalMode === 'add'
                    ? setAddForm({ ...addForm, email: v })
                    : setSelectedUser(selectedUser ? { ...selectedUser, email: v } : null)}
                  placeholder="user@ishout.ae"
                />

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">Phone Number</label>
                  <div className="md:hidden">
                    <PhoneInput international defaultCountry="AE" countryCallingCodeEditable={false}
                      placeholder="Enter phone number"
                      value={normalizePhoneNumberForDisplay(modalMode === 'add' ? addForm.phone : selectedUser?.phone ?? '')}
                      onChange={(value) => modalMode === 'add'
                        ? setAddForm({ ...addForm, phone: removePlusPrefix(value) })
                        : setSelectedUser(selectedUser ? { ...selectedUser, phone: removePlusPrefix(value) } : null)}
                      className="admin-phone-input"
                      countrySelectComponent={MobileCountrySelect}
                    />
                  </div>
                  <div className="hidden md:block">
                    <PhoneInput international defaultCountry="AE" countryCallingCodeEditable={false}
                      placeholder="Enter phone number"
                      value={normalizePhoneNumberForDisplay(modalMode === 'add' ? addForm.phone : selectedUser?.phone ?? '')}
                      onChange={(value) => modalMode === 'add'
                        ? setAddForm({ ...addForm, phone: removePlusPrefix(value) })
                        : setSelectedUser(selectedUser ? { ...selectedUser, phone: removePlusPrefix(value) } : null)}
                      className="admin-phone-input"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
                    {modalMode === 'add' ? 'Password' : 'New Password (leave blank to keep current)'}
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required={modalMode === 'add'}
                      value={modalMode === 'add' ? addForm.password : selectedUser?.password ?? ''}
                      onChange={(e) => modalMode === 'add'
                        ? setAddForm({ ...addForm, password: e.target.value })
                        : setSelectedUser((prev) => prev ? { ...prev, password: e.target.value } : null)}
                      className="h-11 bg-[#0d0d10] border-white/10 text-white placeholder:text-white/20 focus:ring-1 focus:ring-pink-500/40 focus:border-pink-500/30 w-full pr-10 rounded-xl"
                    />
                    <button type="button" onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-6 pb-6">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-white/0.08 text-sm text-white/45 hover:text-white hover:bg-white/0.05 transition-all">
                  Cancel
                </button>
                <button type="submit"
                  disabled={modalMode === 'add' ? addUserHook.isPending : isUpdating}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#e8185c,#c4144e)', boxShadow: '0 4px 14px rgba(232,24,92,0.3)' }}>
                  {(modalMode === 'add' ? addUserHook.isPending : isUpdating)
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : modalMode === 'add' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}