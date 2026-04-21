import { ArrowRight, Activity, Flame, Trophy, Target, Zap, Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/landing-hero.jpg";
import logo from "@/assets/movit-logo.png";

const APP_URL = "https://movit-3109.web.app/";

const features = [
  {
    icon: Activity,
    title: "Track Every Move",
    description: "Monitor your steps, calories, and workout minutes in real time with precision analytics.",
  },
  {
    icon: Flame,
    title: "Build Your Streak",
    description: "Stay consistent with daily streak counters that turn small wins into lifelong habits.",
  },
  {
    icon: Trophy,
    title: "Crush Your Goals",
    description: "Set weekly targets and celebrate every milestone on your fitness journey.",
  },
  {
    icon: Target,
    title: "Personalized Workouts",
    description: "Curated routines for every level — from beginner stretches to high-intensity HIIT.",
  },
  {
    icon: Zap,
    title: "Quick Sessions",
    description: "No time? No excuses. Get effective workouts as short as 15 minutes.",
  },
  {
    icon: Heart,
    title: "Built for Beginners",
    description: "Designed for the lazy, the busy, and the just-getting-started. Movement made simple.",
  },
];

const steps = [
  { number: "01", title: "Sign Up", description: "Create your free account in seconds." },
  { number: "02", title: "Set Your Goal", description: "Tell us your target — we'll build the plan." },
  { number: "03", title: "Start Moving", description: "Follow daily workouts and track your progress." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Movit logo" className="w-8 h-8" width={32} height={32} />
            <span className="text-xl font-black tracking-tight">MOVIT</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <Link to="/app" className="hover:text-foreground transition-colors">Preview</Link>
          </nav>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange text-primary-foreground px-5 py-2 rounded-full text-sm font-bold shadow-orange hover:scale-105 transition-transform"
          >
            Launch App
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Athlete sprinting at sunrise"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 surface-1 border border-border rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                Movement made simple
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
              MOVE.
              <br />
              <span className="text-gradient-orange">SWEAT.</span>
              <br />
              REPEAT.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              The fitness app for people who hate fitness apps. Build streaks, smash goals,
              and turn lazy days into your strongest comeback.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group gradient-orange text-primary-foreground px-8 py-4 rounded-full text-base font-bold shadow-orange hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="surface-1 border border-border text-foreground px-8 py-4 rounded-full text-base font-bold hover:border-orange/40 transition-colors inline-flex items-center justify-center gap-2"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { value: "10K+", label: "Active users" },
                { value: "2M+", label: "Workouts logged" },
                { value: "4.9★", label: "User rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-black text-gradient-orange">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-bold text-orange tracking-widest uppercase mb-3">Why Movit</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Everything you need.
              <br />
              <span className="text-muted-foreground">Nothing you don't.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group surface-1 border border-border rounded-2xl p-7 hover:border-orange/40 transition-all hover:-translate-y-1 shadow-card"
              >
                <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center mb-5 shadow-orange">
                  <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 surface-1 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-bold text-orange tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Start in three steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="bg-background border border-border rounded-2xl p-8 h-full">
                  <div className="text-6xl font-black text-gradient-orange mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 w-6 h-6 text-orange z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-border surface-1 p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-orange/20 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Your strongest self
              <br />
              starts <span className="text-gradient-orange">today.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Join thousands turning movement into a daily ritual. Free to start.
            </p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group gradient-orange text-primary-foreground px-10 py-5 rounded-full text-lg font-bold shadow-orange hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Launch Movit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Movit" className="w-7 h-7" width={28} height={28} />
            <span className="font-black tracking-tight">MOVIT</span>
            <span className="text-muted-foreground text-sm ml-2">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Launch App
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
