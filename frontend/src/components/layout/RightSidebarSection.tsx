import { ReactNode } from "react";

type RightSidebarSectionProps = {
  title: string;
  children: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export const RightSidebarSection = ({
  title,
  children,
  action,
}: RightSidebarSectionProps) => {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h3>
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default RightSidebarSection;
