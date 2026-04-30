function MiniCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="bg-[#0f0f12] border border-white/10 rounded-xl p-3">
            <p className="text-[10px] text-white/40">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
        </div>
    );
}

export default MiniCard