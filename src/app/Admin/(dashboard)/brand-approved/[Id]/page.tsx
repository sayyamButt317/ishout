import { CheckCircle2 } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';

type Creator = {
  id: string;
  name: string;
  niche: string;
  statusLabel: string;
  statusTone: 'amber' | 'emerald' | 'slate';
  followers: string;
  engagement: string;
  thumb: string;
};

const STATUS_TONES: Record<Creator['statusTone'], string> = {
  amber: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
  slate: 'bg-white/5 text-white/60 border border-white/10',
};

const CREATORS: Creator[] = [
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    niche: 'Lifestyle & Fashion',
    statusLabel: 'Asset Pending',
    statusTone: 'amber',
    followers: '124.5k',
    engagement: '4.8%',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQcQny63Q4Wwm44aEHWV5DVYXXAe-4B5Kroos1COhE9_ipDWbWTyzkaVcDzz8Wxma4f0__90wb_dr1kqz9hYOsjcF0RbLeIBmlM7yesyh7ThB1FSHpVA8dBaRtPZTulPRsltYFxNJ2IsAMPrYFjIC8SSmwDmd6F8zzuXd7erDkE-Y3QGfE7w8ohD9TUFkSSwqcdNMWDZjUj8RHeHYcLHY0hk2PpRER__JN0lrQJQejgDT-NBLWZzqXgOsf1OZIP8b9iyNZJNZpCdI',
  },
  {
    id: 'marcus',
    name: 'Marcus Thorne',
    niche: 'Fitness & Wellness',
    statusLabel: 'Active Contract',
    statusTone: 'emerald',
    followers: '89.2k',
    engagement: '6.1%',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDVprybslqSUK9cuyEpM0DonViQcj6angcM2x0rigYSojH7mJmuaGsGi_xGCO8sKgpqvI_Wx2PsGVEviElntbsK5BJIcRfHVKcxgUKEbQUhNlsBUK_oDsqT9zqTodC_x5G6r-bXWlqI-EIMVQlRojEt71nCKW8cqtzj0PMSfU9L767cUJhlecGzU20uxagROUKGxa-AMKWdOrWSNg_5s2PPqVSCEZ5qrkD2_JkT8xGUbURany_EH01i1spnPmpJUCpoliYEDmfJeQ',
  },
  {
    id: 'elena',
    name: 'Elena Rodriguez',
    niche: 'Travel & Tech',
    statusLabel: 'Onboarding',
    statusTone: 'slate',
    followers: '312.0k',
    engagement: '3.9%',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD06qhIDzquaWRnaZLpnRH5Pao0IXepsfr-sv2Wz9RX_Edw19q6seL6ar2r-S6u5eKyMhlhx5S8QGHoJLjxQu2iF-iC15awPZejpyDfJh3Y6np3SpmaW2ZDlLOx935Cw1aMXSdcD8y7flVsTTGvl2DqZG_ym0FdMH5WM27pV3N3BYSS8NrIvnngq1pSsdT8iUnlYrLBsbbzkz7WXcVbF9lzDmcW75EgGfzrmb7HEiidq3HorDa_GRuEuy7F3PdCttmFqht7Dskoy5w',
  },
  {
    id: 'david',
    name: 'David Kim',
    niche: 'Tech & Gaming',
    statusLabel: 'Asset Pending',
    statusTone: 'amber',
    followers: '45.8k',
    engagement: '9.2%',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI4VtpxMEcZaMhO7zwxQ3jOXp8cpzRFXQCUuUYtzhGlmo85OG9AF5zlMPcLqSeHCRENm6ilyKpopFFJHshreOMPW8K6DkOjaVKnZcRnnaAv3MV6ow3zuyD7v-zgsIWJ7TKozKBSMwZbyQj-xlH1ecKn81ta8sB2CrHOFwLwB8KUHGis8WD8ceByFT45AcNrRj_yyj4bbBcQpfqL26iWtEtfOUrru704ROxK0fIG5Huv5QNVtPMjScuqPVcBrTNhbCtKS6o4x1BQ5o',
  },
  {
    id: 'chloe',
    name: 'Chloe Vance',
    niche: 'Skincare & Beauty',
    statusLabel: 'Active Contract',
    statusTone: 'emerald',
    followers: '201.3k',
    engagement: '5.5%',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPGaN-cBRCoRQabeNgEcAzCSTgir7e_S2Iy8aYWL804hpGTl_rhJMRQtNaqK3kX3UHEoMwcf40dna6PRKipNaVaJ3FFLyM0LNMEfRxCJrO784a8WQRqubSJ7OSBwBiGpF1Lr7D0Wlomy7zsKcBwsAhKEg0aw9ADHlAz7ufw1KNPwuDikv7DLTG_DIe9YVdA3_m2UvMwFmcQNWB2dLVocRRdmJZ7CydkCfiLlhJ-fJxaZbq7SiL2-rDYLnJYwZkI6vivrYf7p-BOTk',
  },
  {
    id: 'liam',
    name: "Liam O'Brian",
    niche: 'Design & Living',
    statusLabel: 'Asset Pending',
    statusTone: 'amber',
    followers: '56.4k',
    engagement: '7.8%',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1E1htui1sWyqIRDRZ5QTrXCe60A_Md1ytumU93zqSD8UTYY2rvwNETN1wuWu3AwK9UtgBht3NjO_XRZvI9DPhWyp51gqxbpNT4Ryrwuh-5XIf-ejX0OnqQ81eh4b_0hQ-zVXAH80p9QlVisRdCiX7vrfqMqJEih3WPfi3gf3evIv5rjeFI3GdiV0x0Y2JAumG9cLXydCpBhsGCs2HJAI5SIFe6s0Zcmf3GO0l6nI4zwrtVm-Ar7u3GRFnHaPxJSDoZbjCDdYa19s',
  },
];

export default function BrandApprovedPage() {
  return (
    <div className="font-sans">
      <PageHeader
        title="Approved Influencers"
        description="Review and manage the creative talent curated for your active spring campaigns. High-impact creators ready for collaboration."
        icon={<CheckCircle2 className="size-5" />}
        actions={
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Export List
            </button>
            <button
              type="button"
              className="rounded-xl bg-(--color-primaryButton) px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:opacity-90 active:scale-[0.99] transition-transform"
            >
              Launch Campaign
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {CREATORS.map((creator) => (
          <div
            key={creator.id}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_12px_24px_rgba(255,255,255,0.02)] transition-all hover:shadow-[0_12px_24px_rgba(255,78,126,0.08)]"
          >
            <div className="relative mb-6">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-white/5">
                <img
                  src={creator.thumb}
                  alt={`${creator.name} profile`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
                <CheckCircle2 className="size-4 text-[var(--color-primaryButton)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/80">
                  Verified
                </span>
              </div>
            </div>

            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold tracking-tight text-white">
                  {creator.name}
                </h3>
                <p className="text-sm text-white/60">{creator.niche}</p>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-tighter ${STATUS_TONES[creator.statusTone]}`}
              >
                {creator.statusLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Followers
                </p>
                <p className="text-lg font-bold text-white">{creator.followers}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Engagement
                </p>
                <p className="text-lg font-bold text-[var(--color-primaryButton)]">
                  {creator.engagement}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
