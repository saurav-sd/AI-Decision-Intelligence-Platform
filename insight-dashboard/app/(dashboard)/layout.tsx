import Sidebar from "@/components/layout/Sidebar";
import Headers from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0B0F19] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 fixed h-full border-r border-white/10">
        <Sidebar />
      </aside>

      {/* MAIN */}
      <div className="flex-1 ml-64 flex flex-col">

        {/* HEADER */}
        {/* <header className="h-16 border-b border-white/10 flex items-center px-6 sticky top-0 bg-[#0B0F19] z-50">
          <h1 className="text-lg font-semibold">Insight Dashboard</h1>
        </header> */}
        <Headers />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}