import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-5 sm:p-8 max-w-6xl">{children}</main>
    </div>
  );
}
