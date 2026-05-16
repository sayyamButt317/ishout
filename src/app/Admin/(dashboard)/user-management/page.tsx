'use client';

import { useState, useMemo } from 'react';
import { UserStatus } from '@/src/app/component/custom-component/user-status';
import { WhatsAppShareButton } from '@/src/app/component/custom-component/whatsappshare';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import AllUsersHook from '@/src/routes/Admin/Hooks/users/allusers-hook';
import DeleteUserHook from '@/src/routes/Admin/Hooks/users/delete-user-hook';
import UpdateUserStatusHook from '@/src/routes/Admin/Hooks/users/update-userstatus-hook';
import CompanyUpdateProfileHook from '@/src/routes/Company/Hooks/update-profile.hook';
import AddUserHook from '@/src/hooks/add-user-hook';
import { UserManagementResponse } from '@/src/types/Admin-Type/usermanagment.type';
import {
  RefreshCcw, Trash, Pencil, X, Loader2, Eye, EyeOff,
  Users, Search, UserPlus, ShieldCheck, Activity,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input';
import { normalizePhoneNumberForDisplay, removePlusPrefix } from '@/src/utils/phone.utils';
import MobileCountrySelect from '@/src/app/component/custom-component/MobileCountrySelect';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'admin' | 'company';
type ModalMode = 'edit' | 'add';
type EditableUser = UserManagementResponse & { password?: string };
type UpdatePayload = { company_name: string; contact_person: string; phone: string; email: string; password?: string };
type AddPayload = { company_name: string; contact_person: string; phone: string; email: string; password: string; role: Role };

const EMPTY_ADD: AddPayload = { company_name: '', contact_person: '', phone: '', email: '', password: '', role: 'company' };

const AVATAR_COLORS = ['bg-pink-600', 'bg-violet-600', 'bg-indigo-600', 'bg-cyan-600', 'bg-emerald-600', 'bg-amber-600'];
const avatarColor = (id: string) => AVATAR_COLORS[(id?.charCodeAt(id.length - 1) ?? 0) % AVATAR_COLORS.length];
const initials = (n: string) => n?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, barWidth, barClass, icon }: {
  label: string; value: number; barWidth: number; barClass: string; icon: React.ReactNode;
}) {
  return (
    <div className="h-40 relative overflow-hidden rounded-2xl border border-foreground/10 dark:border-foreground/8 p-6 transition-colors backdrop-blur-md bg-foreground/10 dark:bg-foreground/5 hover:bg-foreground/12 dark:hover:bg-foreground/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]">
      <div className="absolute top-0 right-5 p-4 opacity-50">{icon}</div>
      <div className="text-6xl text-foreground pb-2">{value}</div>
      <div className="text-lg tracking-[0.15em] text-foreground/60 mb-2">{label}</div>
      <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${Math.min(barWidth, 100)}%` }} />
      </div>
    </div>
  );
}

// ─── Modal Field ──────────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">{label}</label>
      <Input type={type} required={required} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 bg-black/40 border-foreground/10 text-foreground placeholder:text-foreground/20
          focus:ring-1 focus:ring-primaryButton/30 focus:border-primaryButton/30 rounded-xl w-full" />
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-foreground/5">
      <td className="px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-foreground/10" />
          <div className="space-y-1.5">
            <div className="h-3 bg-foreground/10 rounded w-28" />
            <div className="h-2.5 bg-foreground/5 rounded w-20" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1.5">
          <div className="h-3 bg-foreground/10 rounded w-32" />
          <div className="h-2.5 bg-foreground/5 rounded w-20" />
        </div>
      </td>
      {[...Array(4)].map((_, i) => (
        <td key={i} className="px-6 py-4"><div className="h-3 bg-foreground/10 rounded w-20" /></td>
      ))}
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UserManagementPage() {
  const [showPw, setShowPw] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<ModalMode>('edit');
  const [editUser, setEditUser] = useState<EditableUser | null>(null);
  const [addForm, setAddForm] = useState<AddPayload>(EMPTY_ADD);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, refetch, isRefetching } = AllUsersHook(page);
  const deleteHook = DeleteUserHook();
  const statusHook = UpdateUserStatusHook();
  const addHook = AddUserHook();
  const { mutate: updateProfile, isPending: isUpdating } = CompanyUpdateProfileHook(editUser?.user_id || '');

  const allUsers = useMemo(() => (data?.users ?? []) as UserManagementResponse[], [data?.users]);

  const filtered = useMemo(() => allUsers.filter(u => {
    const q = search.toLowerCase();
    return (
      (!q || [u.company_name, u.contact_person, u.email, u.phone].some(f => f?.toLowerCase().includes(q))) &&
      (roleFilter === 'all' || u.role === roleFilter)
    );
  }), [allUsers, search, roleFilter]);

  const stats = {
    total: allUsers.length,
    admins: allUsers.filter(u => u.role === 'admin').length,
    active: allUsers.filter(u => u.status === 'active').length,
  };

  const totalPages = data?.total_pages ?? 1;

  // ── Helpers ───────────────────────────────────────────────────────────────

  const closeModal = () => { setModalOpen(false); setEditUser(null); setAddForm(EMPTY_ADD); setShowPw(false); };
  const openEdit = (u: UserManagementResponse) => { setMode('edit'); setEditUser({ ...u, password: '' }); setShowPw(false); setModalOpen(true); };
  const openAdd = () => { setMode('add'); setAddForm(EMPTY_ADD); setShowPw(false); setModalOpen(true); };

  const af = (k: keyof AddPayload) => (v: string) => setAddForm(p => ({ ...p, [k]: v }));
  const ef = (k: keyof EditableUser) => (v: string) => setEditUser(p => p ? { ...p, [k]: v } : null);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    const payload: UpdatePayload = {
      company_name: editUser.company_name, contact_person: editUser.contact_person,
      phone: removePlusPrefix(editUser.phone), email: editUser.email,
    };
    if (editUser.password?.trim()) payload.password = editUser.password;
    updateProfile(payload, { onSuccess: () => { closeModal(); refetch(); } });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addHook.mutate(
      { ...addForm, phone: removePlusPrefix(addForm.phone) },
      { onSuccess: () => { closeModal(); refetch(); } },
    );
  };

  // ✅ Fixed: handleDelete clears deleteId on success so dialogue closes
  const handleDelete = () => {
    if (!deleteId) return;
    deleteHook.mutate(deleteId, {
      onSuccess: () => { setDeleteId(null); refetch(); },
    });
  };

  const phoneVal = mode === 'add' ? addForm.phone : editUser?.phone ?? '';
  const phoneOnChange = (v: string) =>
    mode === 'add'
      ? setAddForm(p => ({ ...p, phone: removePlusPrefix(v) }))
      : setEditUser(p => p ? { ...p, phone: removePlusPrefix(v) } : null);

  return (
    <div className="mt-5">
      <PageHeader
        title="User Management"
        description={`${filtered.length} of ${data?.total ?? 0} users`}
        icon={<Users className="size-5" />}
        actions={
          <div className="flex items-center gap-4">
            <button onClick={openAdd}
              className="flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white
                bg-primaryButton hover:bg-primaryButton/90 transition-all hover:scale-[1.02] active:scale-[0.98]
                shadow-lg shadow-primaryButton/25">
              <UserPlus className="w-4 h-4" /> Add User
            </button>
            <button onClick={() => refetch()} disabled={isRefetching}
              className="w-9 h-9 rounded-xl bg-foreground/5 flex items-center justify-center
                text-foreground/40 hover:text-foreground transition-all disabled:opacity-40">
              <RefreshCcw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        }
      />

      <div className=" pb-12 space-y-2">

        {/* ── STATS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Total Users" value={stats.total}
            barWidth={(stats.total / 20) * 100} barClass="bg-gradient-to-r from-primaryButton to-pink-400"
            icon={<Users className="w-16 h-16 text-pink-500" />} />
          <StatCard label="Admins" value={stats.admins}
            barWidth={(stats.admins / Math.max(stats.total, 1)) * 100} barClass="bg-gradient-to-r from-primaryButton to-purple-400"
            icon={<ShieldCheck className="w-16 h-16 text-purple-500" />} />
          <StatCard label="Active Users" value={stats.active}
            barWidth={(stats.active / Math.max(stats.total, 1)) * 100} barClass="bg-gradient-to-r from-green-400 to-emerald-500"
            icon={<Activity className="w-16 h-16 text-green-500" />} />
        </div>

        {/* ── TABLE CARD ── */}
        <div className="bg-foreground/5 rounded-2xl border border-red/5 overflow-hidden shadow-2xl shadow-black/40">

          {/* Filters */}
          <div className="px-8 py-5 border-b border-foreground/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-foreground">All Users</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, email or company…"
                  className="w-full sm:w-72 bg-foreground/5 border border-white/[0.07] rounded-xl pl-10 pr-4 py-2
                    text-sm text-foreground/95 placeholder:text-foreground/40 outline-none focus:border-primaryButton/40 transition-colors" />
              </div>
              <div className="flex items-center gap-1 bg-foreground/10 border border-foreground/5 rounded-xl p-1 cursor-pointer">
                {(['all', 'admin', 'company'] as const).map(r => (
                  <button key={r} onClick={() => setRoleFilter(r)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer capitalize transition-all ${roleFilter === r ? 'bg-[#3d3d4d] text-white shadow-sm' : 'text-foreground hover:text-white/80'
                      }`}>
                    {r === 'all' ? 'All' : r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-foreground/5">
                  {[['User', 'px-8 py-5'], ['Company', 'px-6 py-5'], ['Contact', 'px-6 py-5'],
                  ['Role', 'px-6 py-5 text-center'], ['Status', 'px-6 py-5 text-center'], ['Actions', 'px-8 py-5 text-right'],
                  ].map(([h, cls]) => (
                    <th key={h} className={`${cls} text-[10px] font-black uppercase tracking-wide text-foreground/80 border-b border-foreground/5 foregroundspace-nowrap`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {isLoading
                  ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                  : filtered.length === 0
                    ? (
                      <tr><td colSpan={6} className="px-8 py-24 text-center">
                        <div className="flex flex-col items-center gap-3 text-foreground/25">
                          <Users className="w-10 h-10 opacity-30" />
                          <p className="text-sm">No users found</p>
                          {(search || roleFilter !== 'all') && (
                            <button onClick={() => { setSearch(''); setRoleFilter('all'); }}
                              className="text-xs text-primaryButton cursor-pointer hover:underline mt-1">Clear filters</button>
                          )}
                        </div>
                      </td></tr>
                    )
                    : filtered.map(user => (
                      <tr key={user.user_id} className="hover:bg-foreground/2.5 transition-colors">

                        {/* User */}
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${avatarColor(user.user_id)} flex items-center justify-center text-foreground text-sm font-bold shrink-0 overflow-hidden`}>
                              {user.logo_url
                                ? <Image src={user.logo_url} alt={user.contact_person} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
                                : initials(user.contact_person)
                              }
                            </div>
                            <div>
                              <p className="text-sm font-bold text-foreground">{user.contact_person}</p>
                              <p className="text-[11px] text-foreground/50 mt-0.5">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Company */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground/60">{user.company_name || '—'}</span>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground/55">{user.email}</p>
                          <p className="text-[11px] text-foreground/30 font-mono mt-0.5">{user.phone || '—'}</p>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${user.role === 'admin'
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`}>
                            {user.role === 'admin' ? 'Admin' : 'Company'}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <UserStatus status={user.status}
                              updateStatus={status => statusHook.mutate({ user_id: user.user_id, status })} />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 cursor-pointer">
                            <div className="p-1.5 rounded-lg hover:text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer">
                              <WhatsAppShareButton phone={user.phone} contactPerson={user.contact_person} className='cursor-pointer' />
                            </div>
                            <button onClick={() => openEdit(user)}
                              className="p-2 rounded-lg bg-foreground/10 text-foreground/40 cursor-pointer hover:text-purple-400 hover:bg-purple-500/10 transition-all">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteId(user.user_id)}
                              className="p-2 rounded-lg bg-foreground/10 text-foreground/40 cursor-pointer hover:text-red-400 hover:bg-red-400/10 transition-all">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-5 bg-foreground/5 border-t border-foreground/5 flex items-center justify-between">
            <p className="text-xs text-foreground/80">
              Showing <span className="text-foreground font-bold">{filtered.length}</span> of{' '}
              <span className="text-foreground font-bold">{data?.total ?? 0}</span> users
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg text-foreground/30 hover:text-foreground disabled:opacity-20 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === page ? 'bg-primaryButton text-foreground' : 'text-foreground/35 hover:text-foreground hover:bg-foreground/5'
                      }`}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg text-foreground/30 hover:text-foreground disabled:opacity-20 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteDialogue
        open={!!deleteId}
        heading="Delete User?"
        subheading="This action cannot be undone. The user will be permanently removed."
        ondelete={handleDelete}
        onClose={() => setDeleteId(null)}
      />

      {/* ── MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#0f0f12', border: '1px solid rgba(255,255,255,0.07)' }}>

            <div className="h-0.5 w-full bg-linear-to-r from-primaryButton via-purple-500 to-emerald-500" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primaryButton/15 border border-primaryButton/20 flex items-center justify-center">
                  {mode === 'add' ? <UserPlus className="w-4 h-4 text-primaryButton" /> : <Pencil className="w-4 h-4 text-primaryButton" />}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">{mode === 'add' ? 'Add New User' : 'Edit User'}</h2>
                  <p className="text-[11px] text-foreground/35 mt-0.5">
                    {mode === 'add' ? 'Create a new account with role access' : 'Update user info and credentials'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-foreground/[0.07] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={mode === 'add' ? handleAdd : handleEdit}>
              <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

                {/* Role selector */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { value: 'company' as Role, label: 'Company', desc: 'Campaign access', dot: 'bg-violet-400', sel: 'bg-violet-500/10 border-violet-500/30 text-foreground' },
                      { value: 'admin' as Role, label: 'Admin', desc: 'Full platform access', dot: 'bg-indigo-400', sel: 'bg-indigo-500/10 border-indigo-500/30 text-foreground' },
                    ]).map(r => {
                      const active = mode === 'add' ? addForm.role === r.value : editUser?.role === r.value;
                      return (
                        <button key={r.value} type="button"
                          onClick={() => mode === 'add' ? setAddForm(p => ({ ...p, role: r.value })) : setEditUser(p => p ? { ...p, role: r.value } : null)}
                          className={`relative flex flex-col items-start gap-0.5 p-3.5 rounded-xl border text-left transition-all ${active ? r.sel : 'bg-foreground/3 border-foreground/[0.07] text-foreground/40 hover:bg-foreground/5'
                            }`}>
                          {active && <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${r.dot}`} />}
                          <span className="text-sm font-semibold">{r.label}</span>
                          <span className="text-[11px] opacity-60">{r.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Contact Person *" required placeholder="Sara Ahmed"
                    value={mode === 'add' ? addForm.contact_person : editUser?.contact_person ?? ''}
                    onChange={mode === 'add' ? af('contact_person') : ef('contact_person')} />
                  <Field label="Company Name *" required placeholder="iShout Media"
                    value={mode === 'add' ? addForm.company_name : editUser?.company_name ?? ''}
                    onChange={mode === 'add' ? af('company_name') : ef('company_name')} />
                </div>

                <Field label="Email *" required type="email" placeholder="user@ishout.ae"
                  value={mode === 'add' ? addForm.email : editUser?.email ?? ''}
                  onChange={mode === 'add' ? af('email') : ef('email')} />

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">Phone Number</label>
                  <div className="md:hidden">
                    <PhoneInput international defaultCountry="AE" countryCallingCodeEditable={false}
                      placeholder="Enter phone number" value={normalizePhoneNumberForDisplay(phoneVal)}
                      onChange={v => phoneOnChange(v ?? '')} className="admin-phone-input"
                      countrySelectComponent={MobileCountrySelect} />
                  </div>
                  <div className="hidden md:block">
                    <PhoneInput international defaultCountry="AE" countryCallingCodeEditable={false}
                      placeholder="Enter phone number" value={normalizePhoneNumberForDisplay(phoneVal)}
                      onChange={v => phoneOnChange(v ?? '')} className="admin-phone-input" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">
                    {mode === 'add' ? 'Password *' : 'New Password (leave blank to keep current)'}
                  </label>
                  <div className="relative">
                    <Input type={showPw ? 'text' : 'password'} placeholder="••••••••"
                      autoComplete="new-password" required={mode === 'add'}
                      value={mode === 'add' ? addForm.password : editUser?.password ?? ''}
                      onChange={e => mode === 'add' ? af('password')(e.target.value) : ef('password')(e.target.value)}
                      className="h-10 bg-black/40 border-foreground/10 text-foreground placeholder:text-foreground/20
                        focus:ring-1 focus:ring-primaryButton/30 focus:border-primaryButton/30 rounded-xl w-full pr-10" />
                    <button type="button" onClick={() => setShowPw(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 px-6 pb-5">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-foreground/[0.07] text-sm text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={mode === 'add' ? addHook.isPending : isUpdating}
                  className="flex-1 py-2.5 rounded-xl bg-primaryButton hover:bg-primaryHover text-foreground text-sm font-bold
                    transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primaryButton/20">
                  {(mode === 'add' ? addHook.isPending : isUpdating)
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : mode === 'add' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}