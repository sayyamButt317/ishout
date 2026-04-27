const BriefCard = ({
  icon,
  title,
  accent = 'primary',
  children,
  colSpan = false,

}: {
  icon: React.ReactNode;
  title: string;
  accent?: 'primary' | 'secondary';
  children: React.ReactNode;
  colSpan?: boolean;
})  => {
  return (
    <div
      className={`rounded-2xl p-6 border border-white/0.06 border-l-4 bg-black/40 backdrop-blur-sm
        ${accent === 'primary' ? 'border-l-primaryButton' : 'border-l-purple-500'}
        ${colSpan ? 'md:col-span-2' : ''}`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className={accent === 'primary' ? 'text-primarytext' : 'text-purple-400'}>
          {icon}
        </span>
        <h4 className="text-xs font-black text-white/80 uppercase tracking-[0.12em]">{title}</h4>
      </div>
      {children}
    </div>
  );
}

export default BriefCard;