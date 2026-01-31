type RightSidebarItemProps = {
  title: string;
  subtitle?: string;
  value?: string;
  icon?: string;
  iconBg?: string;
  onClick?: () => void;
  isActive?: boolean;
};

export const RightSidebarItem = ({
  title,
  subtitle,
  value,
  icon,
  iconBg = "bg-indigo-500",
  onClick,
  isActive = false,
}: RightSidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={[
        "flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all",
        isActive
          ? "bg-indigo-500/20 ring-1 ring-inset ring-indigo-400"
          : "hover:bg-slate-800",
      ].join(" ")}
    >
      {icon && (
        <div
          className={[
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
            iconBg,
          ].join(" ")}
        >
          <span
            className="material-symbols-outlined text-xl text-white"
            style={{
              fontVariationSettings:
                "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {icon}
          </span>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <h4 className="truncate text-sm font-semibold text-white">{title}</h4>
        {subtitle && (
          <p className="truncate text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
      {value && (
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{value}</p>
        </div>
      )}
    </div>
  );
};

export default RightSidebarItem;
