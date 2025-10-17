export const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto">
      <div className="bg-white/90 px-6 py-4 rounded-xl shadow-xl flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-base font-semibold italic text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
};
