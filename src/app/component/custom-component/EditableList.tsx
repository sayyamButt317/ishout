const EditableList = ({
  items,
  editable,
  onChange,
  placeholder,
}: {
  items: string[];
  editable: boolean;
  onChange: (v: string[]) => void;
  placeholder?: string;
}) => {
  if (!editable) {
    if (!items?.length) return <p className="text-md text-white/25 italic">—</p>;
    return (
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-md text-white/65 leading-relaxed">
            <span className="mt-3 w-2 h-2 rounded-full bg-primaryButton/70 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    );
}
  return (
    <textarea
      rows={Math.max(3, items?.length ?? 3)}
      className='w-full bg-black/30 border border-white/10 rounded-xl pl-6 px-4 py-3 text-sm gap-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primaryButton/50 focus:ring-1 focus:ring-primaryButton/20 transition-all resize-none disabled:opacity-50 disabled:cursor-default leading-relaxed'
      value={items?.join('\n') ?? ''}
      placeholder={placeholder ?? 'One item per line…'}
      onChange={(e) => onChange(e.target.value.split('\n'))}
    />
  );
}

export default EditableList;