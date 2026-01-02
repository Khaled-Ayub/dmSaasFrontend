import { Plus } from "lucide-react";

const TeamMembers = () => {
  const members = [
    {
      name: "Max Müller",
      role: "Kundenservice-Leiter",
      badge: "Admin",
      badgeType: "primary" as const,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      online: true,
    },
    {
      name: "Anna Schmidt",
      role: "Support-Agentin",
      badge: "Agent",
      badgeType: "success" as const,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      online: true,
    },
    {
      name: "Tom Weber",
      role: "Social Media Manager",
      badge: "Agent",
      badgeType: "success" as const,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      online: false,
    },
  ];

  return (
    <div className="card-dashboard animate-fade-in" style={{ animationDelay: "0.1s" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-foreground">Team-Mitglieder</h2>
        <a href="#" className="text-sm text-primary hover:underline font-medium">
          Alle anzeigen
        </a>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                {member.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></span>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{member.name}</span>
                  <span className={`badge-${member.badgeType}`}>{member.badge}</span>
                </div>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>

            {/* Action */}
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
