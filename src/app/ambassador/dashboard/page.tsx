// import ReferralEarningsSection from '@/components/Earnings';

// import ReferralEarningsSection from "@/app/components/ReferralEarningsSection";

// export default function AmbassadorDashboard() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Ambassador Dashboard</h1>
//       <ReferralEarningsSection />
//     </div>
//   );
// }


'use client';

import AmbassadorLayout from '@/components/layout/AmbassadorLayout';
import ReferralEarningsSection from '@/app/components/ReferralEarningsSection';

export default function AmbassadorDashboard() {
  return (
    <AmbassadorLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Welcome to Your Ambassador Dashboard</h1>

        <ReferralEarningsSection />
      </div>
    </AmbassadorLayout>
  );
}



