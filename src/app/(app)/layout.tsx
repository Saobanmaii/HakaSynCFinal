import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/authContext";
import { Sidebar } from "@/components/shared/Sidebar";
import { PageTransition } from "@/components/shared/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F4F0EB]">
        <Sidebar />
        <main className="ml-20 p-4 sm:p-6 min-h-screen overflow-x-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
