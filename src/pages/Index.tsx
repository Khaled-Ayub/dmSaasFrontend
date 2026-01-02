import TopNavigation from "@/components/dashboard/TopNavigation";
import MessagesOverview from "@/components/dashboard/MessagesOverview";
import TeamMembers from "@/components/dashboard/TeamMembers";
import PremiumCard from "@/components/dashboard/PremiumCard";
import RecentConversations from "@/components/dashboard/RecentConversations";
import MonthlyStats from "@/components/dashboard/MonthlyStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <MessagesOverview />
            <TeamMembers />
            <PremiumCard />
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2 space-y-6">
            <RecentConversations />
            <MonthlyStats />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
