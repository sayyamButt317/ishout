import { useRef, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ProfileAvatarProps {
  name: string;
  userId: string;
  logoUrl?: string;
  isediting?: boolean;
  pendingFile?: File | null;
  onFileChange?: (file: File) => void;
  onRemove?: () => void;
}


const AVATAR_COLORS = ['bg-pink-600', 'bg-violet-600', 'bg-indigo-600', 'bg-cyan-600', 'bg-emerald-600', 'bg-amber-600'];
const avatarColor   = (id: string) => AVATAR_COLORS[(id?.charCodeAt(id.length - 1) ?? 0) % AVATAR_COLORS.length];
const initials      = (n: string)  => n?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';


export const ProfileAvatar = ({
  name,
   userId,
    logoUrl,
  pendingFile, onFileChange, onRemove,
}: ProfileAvatarProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(
    () => (pendingFile ? URL.createObjectURL(pendingFile) : null),
    [pendingFile],
  );

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const imageSrc = previewUrl || logoUrl;
  const hasImage = !!imageSrc;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange?.(file);
    e.target.value = "";
  };

  return (
    <section className="backdrop-blur-xl bg-[#1c1b1b]/60 border border-white/5 rounded-xl px-3 py-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-6">

        {/* Avatar circle */}
        <div
          className="relative group shrink-0 cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <div className={`w-24 h-24 rounded-full overflow-hidden border-2 border-primaryButton flex items-center justify-center ${!hasImage ? avatarColor(userId) : ""}`}>
            {hasImage ? (
              <Image
                src={imageSrc}
                alt={name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
                unoptimized={!!previewUrl}
              />
            ) : (
              <span className="text-white text-xl font-black">{initials(name)}</span>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>

        {/* Info + actions */}
        <div className="flex-1 w-full text-center sm:text-left">
          <p className="text-white font-bold text-base mb-0.5">{name || "Brand Avatar"}</p>
          <p className="text-white/40 font-extralight mb-4">
              Click the avatar button to change your picture.
          </p>

          {/* <div className="flex items-center gap-3 justify-center sm:justify-start">

            {hasImage && (
              <button
                type="button"
                onClick={() => onRemove?.()}
                className="text-xs tracking-widest cursor-pointer text-red-400/80 hover:text-red-400 transition-colors"
              >
                Remove Picture
              </button>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
};