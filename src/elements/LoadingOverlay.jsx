export const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) null;
  return (
    <div className="h-screen w-full absolute flex items-center justify-center">
      <div className="px-3 py-2 rounded-lg">
        <h1 className="text-center font-bold text-xl italic">Loading, Please wait ....</h1>
      </div>
    </div>
  );
};
