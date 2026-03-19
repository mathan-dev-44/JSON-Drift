interface BreadcrumbItem {
  id: string;
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onItemClick: (id: string) => void;
  className?: string;
}

export default function Breadcrumb({
  items,
  onItemClick,
  className = "",
}: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-1 text-xs overflow-x-auto jf-scrollbar ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.id} className="flex items-center gap-1 shrink-0">
            {isLast ? (
              <span className="px-2 py-1 rounded text-jf-text font-semibold bg-jf-accent/10 truncate max-w-32">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onItemClick(item.id)}
                className="px-2 py-1 rounded transition-colors truncate max-w-32 text-jf-accent hover:bg-jf-bg-card cursor-pointer"
              >
                {item.label}
              </button>
            )}
            {!isLast && <span className="text-jf-text-secondary">/</span>}
          </div>
        );
      })}
    </div>
  );
}
