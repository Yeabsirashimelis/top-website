export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">{children}</div>
  );
}
