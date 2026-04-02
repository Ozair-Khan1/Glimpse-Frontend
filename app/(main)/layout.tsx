import Sidebar from "../sidebar/page";
import '../css/globals.css'
import { AuthProvider } from "../utils/authContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-full flex flex-col w-full" suppressHydrationWarning>
        <Sidebar />
        <main className="flex flex-col mx-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}