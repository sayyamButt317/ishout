import { Eye, ImagePlus, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'

const AssetPicker = () => {
  const ASSETS = [
    { id: '1', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFm218hUlQtprABE2VpNvsBcNk9X4YpEC_4BIkuOa__4Fp81eXzts1h_ubhcKBTVx-ryTJxIxSQxarOTdRTMY_QzEbhyjsUMReMNKIj7KgCRGuDq14mMOVLWdsKr-bPa7zu3BoKJ6oRU1nQACAIsqJtXyXsy8iX91fQtBbGEr-EZDhVgJNIQpUokynJsE3x3zuMMcL3kA8YP1ovUQgrGdyaiyQe8NiQGjm3ii3oEX5tu6zJuLlLnbj_FiB3zIYHSH8D7U66MElgeI' },
    { id: '2', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk6txO4EsT7ERAqG9Dr4mf-QSdoItPdOiD21JaP_bBlo4tL778k8sx_238OS6pq4ETszboiBkHWteNy33o5NbKTMcKbxAl1RtHql_O-Ai-e6b_Wj4poaZr6b7y7I-bGS7EAoEG0yDkuJ4CaBzv-BQpgAVLovx7uCmbO_UIUyx8nZ9c1G-dEHRZFqSFO3amWbSt8Ux_I-ChBSBYfth6FrsWqdKKgT2o49MhLl3FlXRy758wSMLRnTo3yn_hKoiTRrVULMdaaHJBeBA' },
    { id: '3', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW2yQL9zDVFZejhyczk_WLZvC7ADcuveqcqNiy-AzY_UKWzNxf1YwZfP9zras4-qwVQaL229Pomg04EAh5QIvREoQ_u1xFNoUumkHc6ddeBQb796K4pho0sIGSMsYjeQBFMieKIuNkNqf3vgiFJsZ7y8yVSz8dqklcCs-I5hoBjei0acdxzkO37xL6Y5djO63fBzEILiMjpuYcZSLp1hy0AeKOplXjoPBFElNL95TmlrO7Sz1gaLGqMLLvYrLf8aDALqoNg3-NTY0' },
  ];
  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-white/10">
    <div className="p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
        Source Assets
      </h3>
      <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/10 p-6 transition-colors hover:border-[var(--color-primaryButton)]/50">
        <Upload className="size-8 text-white/40" />
        <p className="text-center text-xs font-medium text-white/50">
          Drag & Drop product photos
          <br />
          or short video clips
        </p>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto px-5 pb-5">
      <div className="grid grid-cols-2 gap-3">
        {ASSETS.map((asset) => (
          <div
            key={asset.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-white/10"
          >
            <Image
              src={asset.thumb}
              alt="Asset"
              fill
              className="object-cover"
              sizes="160px"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-md bg-white/20 p-1.5 hover:bg-white/40">
                <Eye className="size-3.5 text-white" />
              </button>
              <button className="rounded-md bg-red-500/20 p-1.5 hover:bg-red-500/40">
                <Trash2 className="size-3.5 text-white" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <ImagePlus className="size-6 text-white/40" />
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 p-5">
      <div className="mb-2 flex items-center justify-between text-xs text-white/50">
        <span>Storage Used</span>
        <span>45%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-[var(--color-primaryButton)]"
          style={{ width: '45%' }}
        />
      </div>
    </div>
  </aside>
  )
}

export default AssetPicker