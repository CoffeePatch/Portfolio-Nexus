import { mockSIPSchedule } from "../../data/mockMutualFundData";

export const UpcomingSIPsWidget = () => {
  const schedule = mockSIPSchedule;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Processing": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Upcoming": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">SIP Schedule</h3>
        <button className="text-xs font-bold text-blue-400 hover:text-blue-300">
          View All
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-hide">
        {schedule.map((item) => (
          <div 
            key={item.id} 
            className="group flex items-center justify-between rounded-xl border border-slate-800/50 bg-black/40 p-3 transition-all hover:border-slate-700 hover:bg-black/60"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 group-hover:text-white">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  calendar_today
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">{item.fundName}</p>
                <p className="text-xs text-slate-500">Due: {item.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-bold text-white">₹{item.amount.toLocaleString()}</p>
              <span className={`mt-1 inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-xl py-3 text-sm font-bold text-white transition-all" style={{ backgroundColor: '#F15C3D' }}>
        Manage Auto-Pay
      </button>
    </div>
  );
};
