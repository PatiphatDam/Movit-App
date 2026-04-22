import { useEffect, useState } from "react";
import { Bell, Calendar, LogOut, ChevronRight, Shield, HelpCircle, Moon, Target } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ProfileScreen = () => {
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [weeklyTarget, setWeeklyTarget] = useState(5);
  const [displayName, setDisplayName] = useState("");
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, streak: 0 });

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      // Profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, weekly_target")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setDisplayName(profile.display_name ?? user.email?.split("@")[0] ?? "Athlete");
        if (profile.weekly_target) setWeeklyTarget(profile.weekly_target);
      } else {
        setDisplayName(user.email?.split("@")[0] ?? "Athlete");
      }

      // Workout stats
      const { data: logs } = await supabase
        .from("workout_logs")
        .select("completed_at")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      if (logs) {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonth = logs.filter((l) => new Date(l.completed_at) >= monthStart).length;

        // Simple streak: consecutive days from today backward
        const dates = new Set(logs.map((l) => new Date(l.completed_at).toDateString()));
        let streak = 0;
        const cursor = new Date();
        while (dates.has(cursor.toDateString())) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
        }
        setStats({ total: logs.length, thisMonth, streak });
      }
    };
    loadData();
  }, [user]);

  const handleTargetChange = async (val: number) => {
    setWeeklyTarget(val);
    if (!user) return;
    await supabase.from("profiles").update({ weekly_target: val }).eq("id", user.id);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "ออกจากระบบแล้ว", description: "แล้วเจอกันใหม่นะ! 👋" });
  };

  const initial = (displayName || "A").charAt(0).toUpperCase();

  const statCards = [
    { label: "Workouts", value: String(stats.total) },
    { label: "Streak", value: `${stats.streak}d` },
    { label: "This Month", value: String(stats.thisMonth) },
  ];

  const menuItems = [
    { icon: Moon, label: "Dark Mode", value: "On", color: "text-purple-400" },
    { icon: Shield, label: "Privacy", value: "", color: "text-green-400" },
    { icon: HelpCircle, label: "Help & Support", value: "", color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-black">Profile</h1>
      </div>

      <div className="px-5 mb-6">
        <div className="surface-1 rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-orange shadow-orange">
                <div className="w-16 h-16 gradient-orange flex items-center justify-center text-3xl font-black text-primary-foreground">
                  {initial}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <h2 className="text-xl font-black">{displayName}</h2>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              <span className="inline-block mt-1.5 text-xs font-semibold text-orange bg-orange/10 px-2.5 py-0.5 rounded-full border border-orange/20">
                Athlete
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {statCards.map(({ label, value }) => (
              <div key={label} className="text-center surface-2 rounded-xl py-3 border border-border">
                <p className="text-xl font-black">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mb-4">
        <div className="surface-1 rounded-2xl p-4 border border-border shadow-card flex items-center gap-3">
          <div className="w-9 h-9 bg-orange/10 rounded-xl flex items-center justify-center">
            <Bell className="w-4 h-4 text-orange" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Notifications</p>
            <p className="text-xs text-muted-foreground">Workout reminders & tips</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative w-12 h-6 rounded-full transition-all ${notifications ? "gradient-orange" : "bg-surface-3"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-primary-foreground rounded-full shadow-sm transition-all ${
                notifications ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="px-5 mb-4">
        <div className="surface-1 rounded-2xl p-4 border border-border shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Weekly Target</p>
              <p className="text-xs text-muted-foreground">{weeklyTarget} days per week</p>
            </div>
            <span className="text-sm font-black text-orange">{weeklyTarget}x</span>
          </div>
          <div className="flex gap-2">
            {[3, 4, 5, 6, 7].map((val) => (
              <button
                key={val}
                onClick={() => handleTargetChange(val)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                  weeklyTarget === val
                    ? "gradient-orange text-primary-foreground shadow-orange"
                    : "surface-2 text-muted-foreground border border-border hover:border-orange/30"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mb-4">
        <div className="surface-1 rounded-2xl border border-border shadow-card overflow-hidden divide-y divide-border">
          {menuItems.map(({ icon: Icon, label, value, color }) => (
            <button key={label} className="w-full flex items-center gap-3 p-4 hover:bg-surface-2 transition-colors text-left">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-2 border border-border">
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="flex-1 text-sm font-semibold">{label}</span>
              {value && <span className="text-xs text-muted-foreground">{value}</span>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-5">
        <button
          onClick={handleSignOut}
          className="w-full surface-1 rounded-2xl p-4 border border-destructive/20 flex items-center gap-3 text-destructive hover:bg-destructive/5 transition-all"
        >
          <div className="w-9 h-9 bg-destructive/10 rounded-xl flex items-center justify-center">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="flex-1 text-sm font-semibold text-left">Sign Out</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6 pb-2">
        Movit v1.0.0 · Made with ❤️ for athletes
      </p>
    </div>
  );
};

export default ProfileScreen;
