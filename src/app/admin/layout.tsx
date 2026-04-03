import { AdminNav } from "@/components/admin/AdminNav";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-[var(--bg)] text-[var(--text)]">
      <AdminNav />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
