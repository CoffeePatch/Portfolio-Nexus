interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-indigo-500/50 transition-all hover:scale-110 hover:shadow-indigo-500/60 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 active:scale-95"
      aria-label="Add transaction"
    >
      <span 
        className="material-symbols-outlined text-4xl transition-transform group-hover:rotate-90" 
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
      >
        add
      </span>
    </button>
  );
};
