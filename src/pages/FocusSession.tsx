import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateMomentumPlan, generateMotivation } from "@/lib/aiEngine";

const FocusSession = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isPulseModeActive, setIsPulseModeActive] = useState(false);
  const [momentumPlan, setMomentumPlan] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [motivation, setMotivation] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startSession = () => {
    if (!task.trim()) {
      toast.error("Please enter a task to begin");
      return;
    }

    const plan = generateMomentumPlan(task);
    const motivationalMessage = generateMotivation();
    
    setMomentumPlan(plan);
    setMotivation(motivationalMessage);
    setSessionStarted(true);
    setIsRunning(true);
    
    toast.success("Focus session started! Let's go! 🎯");
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    toast(isRunning ? "Timer paused" : "Timer resumed");
  };

  const resetSession = () => {
    setSessionStarted(false);
    setIsPulseModeActive(false);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setCurrentStep(0);
    setTask("");
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    // Save to journal
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const newSession = {
      task,
      completedAt: new Date().toISOString(),
      duration: 25,
      steps: momentumPlan,
    };
    localStorage.setItem("sessions", JSON.stringify([newSession, ...sessions]));
    
    // Update stats
    const totalSessions = parseInt(localStorage.getItem("totalSessions") || "0") + 1;
    const totalMinutes = parseInt(localStorage.getItem("totalMinutes") || "0") + 25;
    localStorage.setItem("totalSessions", totalSessions.toString());
    localStorage.setItem("totalMinutes", totalMinutes.toString());
    
    toast.success("🎉 Session complete! Great work!");
    
    setTimeout(() => {
      navigate("/journal");
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  if (isPulseModeActive && sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="relative">
            <div className="text-7xl font-bold text-primary animate-pulse">
              {formatTime(timeLeft)}
            </div>
            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl -z-10 animate-pulse" />
          </div>
          
          {momentumPlan[currentStep] && (
            <Card className="p-8 max-w-md mx-auto shadow-glow border-primary/20">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <p className="text-xl font-medium">
                  {momentumPlan[currentStep]}
                </p>
              </div>
              {motivation && (
                <p className="text-sm text-muted-foreground italic border-t border-border/50 pt-4 mt-4">
                  {motivation}
                </p>
              )}
            </Card>
          )}
          
          <div className="flex gap-4 justify-center">
            <Button
              onClick={toggleTimer}
              size="lg"
              variant={isRunning ? "outline" : "default"}
              className="gap-2"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button
              onClick={() => setIsPulseModeActive(false)}
              variant="outline"
              size="lg"
            >
              Exit Pulse Mode
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {!sessionStarted ? (
          <Card className="p-8 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What do you want to accomplish?
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="e.g., Start my essay, Work on project report..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startSession()}
                className="text-lg py-6"
                autoFocus
              />
              <Button
                onClick={startSession}
                size="lg"
                className="w-full gap-2"
              >
                <Play className="w-5 h-5" />
                Generate Plan & Start Focus
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            {/* Timer Card */}
            <Card className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-1000" 
                   style={{ width: `${progressPercentage}%` }} />
              
              <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                {task}
              </h3>
              <div className="text-6xl font-bold text-primary my-6">
                {formatTime(timeLeft)}
              </div>
              
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  variant={isRunning ? "outline" : "default"}
                  className="gap-2"
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isRunning ? "Pause" : "Resume"}
                </Button>
                <Button
                  onClick={() => setIsPulseModeActive(true)}
                  size="lg"
                  variant="outline"
                  className="gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Pulse Mode
                </Button>
                <Button
                  onClick={resetSession}
                  size="lg"
                  variant="outline"
                  className="gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </Button>
              </div>
            </Card>

            {/* Momentum Plan */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Your Momentum Plan
              </h3>
              <div className="space-y-3">
                {momentumPlan.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all ${
                      index === currentStep
                        ? "bg-primary/10 border-primary shadow-sm"
                        : "bg-secondary/50 border-border/50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`font-bold ${
                        index === currentStep ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {index + 1}.
                      </div>
                      <div className={index === currentStep ? "font-medium" : ""}>
                        {step}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {currentStep < momentumPlan.length - 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Next Step
                </Button>
              )}
            </Card>

            {motivation && (
              <Card className="p-6 bg-accent/5 border-accent/20">
                <p className="text-center italic text-accent-foreground">
                  "{motivation}"
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusSession;
