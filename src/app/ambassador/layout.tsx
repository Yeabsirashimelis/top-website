// src/app/ambassador/layout.tsx
import AmbassadorLayout from '@/components/layout/AmbassadorLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AmbassadorLayout>{children}</AmbassadorLayout>;
}
