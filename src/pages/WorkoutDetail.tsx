import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Zap, Flame, Play, CheckCircle, ChevronRight } from "lucide-react";

const workoutDetails: Record<number, {
  name: string;
  icon: string;
  duration: string;
  calories: number;
  difficulty: string;
  type: string;
  exercises: { name: string; sets?: string; reps?: string; distance?: string; duration?: string }[];
}> = {
  1: {
    name: "Morning Run",
    icon: "🏃",
    duration: "32 min",
    calories: 285,
    difficulty: "Medium",
    type: "Running",
    exercises: [
      { name: "Warm-up Walk", duration: "5 min" },
      { name: "Easy Jog", distance: "1.5 km", duration: "10 min" },
      { name: "Tempo Run", distance: "2 km", duration: "12 min" },
      { name: "Cool-down Walk", duration: "5 min" },
    ],
  },
  2: {
    name: "Upper Body Strength",
    icon: "💪",
    duration: "45 min",
    calories: 320,
    difficulty: "Hard",
    type: "Strength",
    exercises: [
      { name: "Push-ups", sets: "4", reps: "15" },
      { name: "Pull-ups", sets: "3", reps: "10" },
      { name: "Dumbbell Press", sets: "4", reps: "12" },
      { name: "Lateral Raises", sets: "3", reps: "15" },
      { name: "Tricep Dips", sets: "3", reps: "12" },
    ],
  },
  3: {
    name: "Evening Yoga",
    icon: "🧘",
    duration: "20 min",
    calories: 95,
    difficulty: "Easy",
    type: "Flexibility",
    exercises: [
      { name: "Sun Salutation", duration: "5 min" },
      { name: "Warrior Poses", duration: "5 min" },
      { name: "Hip Openers", duration: "5 min" },
      { name: "Savasana", duration: "5 min" },
    ],
  },
};

const difficultyColors: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

interface WorkoutDetailProps {
  workoutId: number;
  onBack: () => void;
}

const WorkoutDetail = ({ workoutId, onBack }: WorkoutDetailProps) => {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const workout = workoutDetails[workoutId] || workoutDetails[1];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (started && !completed) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, completed]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const toggleExercise = (idx: number) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleComplete = () => {
    setCompleted(true);
    setStarted(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Hero Header */}
      <div className="relative px-5 pt-12 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center text-3xl border border-border">
            {workout.icon}
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{workout.type}</p>
            <h1 className="text-2xl font-black mt-0.5">{workout.name}</h1>
            <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-semibold border mt-1.5 ${difficultyColors[workout.difficulty]}`}>
              {workout.difficulty}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3">
          {[
            { icon: Clock, value: workout.duration, label: "Duration", color: "text-blue-400" },
            { icon: Zap, value: `${workout.calories}`, label: "Calories", color: "text-orange" },
            { icon: Flame, value: workout.difficulty, label: "Level", color: "text-red-400" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="flex-1 surface-1 rounded-xl p-3 border border-border text-center">
              <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
              <p className="text-sm font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timer (when started) */}
      {started && !completed && (
        <div className="mx-5 mb-5 gradient-orange rounded-2xl p-5 text-center shadow-orange animate-scale-in">
          <p className="text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider mb-1">Elapsed Time</p>
          <p className="text-primary-foreground text-5xl font-black tracking-tight">{formatTime(seconds)}</p>
        </div>
      )}

      {/* Completed Banner */}
      {completed && (
        <div className="mx-5 mb-5 surface-1 border border-green-500/30 rounded-2xl p-5 text-center animate-scale-in">
          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
          <p className="text-lg font-black">Workout Complete! 🎉</p>
          <p className="text-muted-foreground text-sm mt-1">You crushed it! {formatTime(seconds)} total</p>
        </div>
      )}

      {/* Exercises List */}
      <div className="px-5">
        <h2 className="text-base font-bold mb-3">Exercises</h2>
        <div className="space-y-2.5">
          {workout.exercises.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => toggleExercise(idx)}
              className={`w-full surface-1 rounded-xl p-4 border flex items-center gap-3 text-left transition-all ${
                completedExercises.has(idx)
                  ? "border-orange/30 bg-orange/5"
                  : "border-border hover:border-border/80"
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                completedExercises.has(idx)
                  ? "border-orange bg-orange"
                  : "border-muted-foreground"
              }`}>
                {completedExercises.has(idx) && (
                  <CheckCircle className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${completedExercises.has(idx) ? "line-through text-muted-foreground" : ""}`}>
                  {ex.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {ex.sets && ex.reps && `${ex.sets} sets × ${ex.reps} reps`}
                  {ex.duration && !ex.distance && ex.duration}
                  {ex.distance && ex.duration && `${ex.distance} · ${ex.duration}`}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 mt-6 space-y-3">
        {!started && !completed && (
          <button
            onClick={() => setStarted(true)}
            className="w-full gradient-orange text-primary-foreground font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-orange hover:opacity-90 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-primary-foreground" />
            Start Workout
          </button>
        )}

        {started && !completed && (
          <button
            onClick={handleComplete}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-green-400 active:scale-95 transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            Complete Workout
          </button>
        )}

        {completed && (
          <button
            onClick={onBack}
            className="w-full gradient-orange text-primary-foreground font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all shadow-orange"
          >
            Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetail;
