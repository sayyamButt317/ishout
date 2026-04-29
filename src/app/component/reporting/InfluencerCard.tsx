// components/InfluencerCard.tsx

import React from "react";

interface Props {
  name: string;
  role: string;
  avatar: string;
  contentImage: string;
  engagement: string;
  resonance: string;
  tag: string;
}

const InfluencerCard = ({
  name,
  role,
  avatar,
  contentImage,
  engagement,
  resonance,
  tag,
}: Props) => {
  return (
    <div className="group relative rounded-[28px] p-[1px] border border-white/10 bg-white/5 hover:border-pink-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,78,126,0.15)] overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between mb-5">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-primaryButton p-[2px]">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold">{name}</h4>
              <p className="text-[10px] text-white/40 uppercase">
                {role}
              </p>
            </div>
          </div>

          <span className="text-[10px] px-2 py-1 rounded bg-primaryButton/20 text-primaryButton border border-primaryButton/20 uppercase">
            {tag}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-60 rounded-xl overflow-hidden mb-5">
          <img
            src={contentImage}
            alt="content"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute bottom-3 left-3 flex gap-6 text-xs">
            <div>
              <p className="text-white/50">Engagement</p>
              <p className="font-semibold">{engagement}</p>
            </div>

            <div>
              <p className="text-white/50">Resonance</p>
              <p className="font-semibold">{resonance}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            <Icon>favorite</Icon>
            <Icon>chat_bubble</Icon>
          </div>

          <button className="flex items-center gap-1 text-primaryButton text-sm hover:opacity-80">
            View Post →
          </button>
        </div>
      </div>
    </div>
  );
};

const Icon = ({ children }: { children: string }) => (
  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 text-xs border border-white/10">
    <span className="material-symbols-outlined text-sm">{children}</span>
  </div>
);

export default InfluencerCard;