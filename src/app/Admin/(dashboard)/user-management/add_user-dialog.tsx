'use client';

import { useState } from 'react';
import { X, Loader2, Eye, EyeOff, UserPlus, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input';
import { normalizePhoneNumberForDisplay } from '@/src/utils/phone.utils';
import MobileCountrySelect from '@/src/app/component/custom-component/MobileCountrySelect';
import { UserManagementResponse } from '@/src/types/Admin-Type/usermanagment.type';

export type UserDialogRole = 'admin' | 'company';
export type UserDialogMode = 'edit' | 'add';
export type EditableUser = UserManagementResponse & { password?: string };

export type AddUserForm = {
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  password: string;
  role: UserDialogRole;
};

export interface AddUserDialogProps {
  open: boolean;
  mode: UserDialogMode;
  onClose: () => void;
  addForm: AddUserForm;
  setAddForm: React.Dispatch<React.SetStateAction<AddUserForm>>;
  editUser: EditableUser | null;
  setEditUser: React.Dispatch<React.SetStateAction<EditableUser | null>>;
  onSubmitAdd: (e: React.FormEvent) => void;
  onSubmitEdit: (e: React.FormEvent) => void;
  phoneVal: string;
  phoneOnChange: (v: string) => void;
  isSubmitting: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">
        {label}
      </label>
      <Input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 bg-black/40 border-foreground/10 text-foreground placeholder:text-foreground/20
          focus:ring-1 focus:ring-primaryButton/30 focus:border-primaryButton/30 rounded-xl w-full"
      />
    </div>
  );
}

export function AddUserDialog({
  open,
  mode,
  onClose,
  addForm,
  setAddForm,
  editUser,
  setEditUser,
  onSubmitAdd,
  onSubmitEdit,
  phoneVal,
  phoneOnChange,
  isSubmitting,
}: AddUserDialogProps) {
  const [showPw, setShowPw] = useState(false);

  if (!open) return null;

  const af = (k: keyof AddUserForm) => (v: string) =>
    setAddForm((p) => ({ ...p, [k]: v }));
  const ef = (k: keyof EditableUser) => (v: string) =>
    setEditUser((p) => (p ? { ...p, [k]: v } : null));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0f0f12', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="h-0.5 w-full bg-linear-to-r from-primaryButton via-purple-500 to-emerald-500" />

        <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primaryButton/15 border border-primaryButton/20 flex items-center justify-center">
              {mode === 'add' ? (
                <UserPlus className="w-4 h-4 text-primaryButton" />
              ) : (
                <Pencil className="w-4 h-4 text-primaryButton" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">
                {mode === 'add' ? 'Add New User' : 'Edit User'}
              </h2>
              <p className="text-[11px] text-foreground/35 mt-0.5">
                {mode === 'add'
                  ? 'Create a new account with role access'
                  : 'Update user info and credentials'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-foreground/[0.07] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={mode === 'add' ? onSubmitAdd : onSubmitEdit}>
          <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">
                Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    {
                      value: 'company' as UserDialogRole,
                      label: 'Company',
                      desc: 'Campaign access',
                      dot: 'bg-violet-400',
                      sel: 'bg-violet-500/10 border-violet-500/30 text-foreground',
                    },
                    {
                      value: 'admin' as UserDialogRole,
                      label: 'Admin',
                      desc: 'Full platform access',
                      dot: 'bg-indigo-400',
                      sel: 'bg-indigo-500/10 border-indigo-500/30 text-foreground',
                    },
                  ] as const
                ).map((r) => {
                  const active =
                    mode === 'add'
                      ? addForm.role === r.value
                      : editUser?.role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() =>
                        mode === 'add'
                          ? setAddForm((p) => ({ ...p, role: r.value }))
                          : setEditUser((p) => (p ? { ...p, role: r.value } : null))
                      }
                      className={`relative flex flex-col items-start gap-0.5 p-3.5 rounded-xl border text-left transition-all ${
                        active
                          ? r.sel
                          : 'bg-foreground/3 border-foreground/[0.07] text-foreground/40 hover:bg-foreground/5'
                      }`}
                    >
                      {active && (
                        <span
                          className={`absolute top-2 right-2 w-2 h-2 rounded-full ${r.dot}`}
                        />
                      )}
                      <span className="text-sm font-semibold">{r.label}</span>
                      <span className="text-[11px] opacity-60">{r.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Contact Person *"
                required
                placeholder="Sara Ahmed"
                value={
                  mode === 'add'
                    ? addForm.contact_person
                    : (editUser?.contact_person ?? '')
                }
                onChange={mode === 'add' ? af('contact_person') : ef('contact_person')}
              />
              <Field
                label="Company Name *"
                required
                placeholder="iShout Media"
                value={
                  mode === 'add' ? addForm.company_name : (editUser?.company_name ?? '')
                }
                onChange={mode === 'add' ? af('company_name') : ef('company_name')}
              />
            </div>

            <Field
              label="Email *"
              required
              type="email"
              placeholder="user@ishout.ae"
              value={mode === 'add' ? addForm.email : (editUser?.email ?? '')}
              onChange={mode === 'add' ? af('email') : ef('email')}
            />

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">
                Phone Number
              </label>
              <div className="md:hidden">
                <PhoneInput
                  international
                  defaultCountry="AE"
                  countryCallingCodeEditable={false}
                  placeholder="Enter phone number"
                  value={normalizePhoneNumberForDisplay(phoneVal)}
                  onChange={(v) => phoneOnChange(v ?? '')}
                  className="admin-phone-input"
                  countrySelectComponent={MobileCountrySelect}
                />
              </div>
              <div className="hidden md:block">
                <PhoneInput
                  international
                  defaultCountry="AE"
                  countryCallingCodeEditable={false}
                  placeholder="Enter phone number"
                  value={normalizePhoneNumberForDisplay(phoneVal)}
                  onChange={(v) => phoneOnChange(v ?? '')}
                  className="admin-phone-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35 mb-2">
                {mode === 'add'
                  ? 'Password *'
                  : 'New Password (leave blank to keep current)'}
              </label>
              <div className="relative">
                <Input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required={mode === 'add'}
                  value={mode === 'add' ? addForm.password : (editUser?.password ?? '')}
                  onChange={(e) =>
                    mode === 'add'
                      ? af('password')(e.target.value)
                      : ef('password')(e.target.value)
                  }
                  className="h-10 bg-black/40 border-foreground/10 text-foreground placeholder:text-foreground/20
                    focus:ring-1 focus:ring-primaryButton/30 focus:border-primaryButton/30 rounded-xl w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 px-6 pb-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-foreground/[0.07] text-sm text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-primaryButton hover:bg-primaryHover text-foreground text-sm font-bold
                transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primaryButton/20"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === 'add' ? (
                'Create User'
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
