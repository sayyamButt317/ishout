interface CampaignCardProps {
  title: string;
  description: string;
  count: number;
  selectedcount: number;
  //   icon: React.ReactNode;
  //   selected: boolean;
}

const CampaignCard = ({
  title,
  description,
  count,
  selectedcount,
}: //   icon,
//   selected,
CampaignCardProps) => {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full text-black text-lg font-bold shadow-lg">
              {count}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {title}
            </h2>
            <p className="text-rose-100/80 text-sm leading-relaxed max-w-md">
              {description}
            </p>
          </div>
        </div>

        {/* Selection Counter */}
        <div className="flex items-center gap-2 text-sm text-rose-200/70">
          <div className="h-1 w-1 rounded-full bg-rose-400" />
          <span>{selectedcount} selected</span>
        </div>
      </div>
    </>
  );
};

export default CampaignCard;
