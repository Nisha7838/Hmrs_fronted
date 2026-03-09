export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
}
