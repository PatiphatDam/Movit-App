import { useState } from "react";
import movitLogo from "@/assets/movit-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({ title: "กรอกข้อมูลไม่ครบ", description: "กรุณาใส่อีเมลและรหัสผ่าน", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast({ title: "สมัครสำเร็จ! 🎉", description: "ยินดีต้อนรับสู่ Movit" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast({
        title: mode === "signup" ? "สมัครไม่สำเร็จ" : "เข้าสู่ระบบไม่สำเร็จ",
        description: err.message ?? "ลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(25, 95%, 53%), transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-sm animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <img src={movitLogo} alt="Movit" className="w-20 h-20 mb-4" />
          <h1 className="text-3xl font-black tracking-tight text-gradient-orange">MOVIT</h1>
          <p className="text-muted-foreground text-sm mt-1">Track. Move. Achieve.</p>
        </div>

        <div className="surface-1 rounded-2xl p-6 shadow-card space-y-4 border border-border">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all text-sm"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full gradient-orange text-primary-foreground font-bold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 active:scale-95 shadow-orange flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                {mode === "signup" ? "Creating..." : "Signing in..."}
              </>
            ) : (
              mode === "signup" ? "Create Account" : "Sign In"
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full border border-border surface-2 text-foreground font-semibold py-3.5 rounded-xl text-sm transition-all hover:border-orange hover:text-orange active:scale-95"
        >
          {mode === "signin" ? "Create Account" : "Already have an account? Sign In"}
        </button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to Movit's{" "}
          <span className="text-orange">Terms of Service</span> and{" "}
          <span className="text-orange">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
