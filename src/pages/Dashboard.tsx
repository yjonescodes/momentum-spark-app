import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, BookOpen, Settings, Crown } from "lucide-react";
import { usePremium } from "@/hooks/usePremium";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-focus-gradient-start to-focus-gradient-end p-3 rounded-2xl shadow-focus">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FocusForge
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            AI-powered focus sessions to overcome procrastination
          </p>
          {isPremium && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <Crown className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Premium Active</span>
            </div>
          )}
        </header>

        {/* Main Actions */}
        <div className="grid gap-6 mb-8">
          <Card 
            className="p-8 hover:shadow-focus transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20"
            onClick={() => navigate("/focus")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Start Focus Session
                </h2>
                <p className="text-muted-foreground">
                  Get an AI-generated momentum plan and begin your focused work session
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer group"
              onClick={() => navigate("/journal")}
            >
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 p-3 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                    Progress Journal
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review your achievements and reflections
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer group"
              onClick={() => navigate("/settings")}
            >
              <div className="flex items-start gap-3">
                <div className="bg-secondary p-3 rounded-lg group-hover:bg-secondary/80 transition-colors">
                  <Settings className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock premium features and customize your experience
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="p-6 bg-calm border-accent/10">
          <h3 className="font-semibold mb-4 text-foreground/80">Your Focus Journey</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {localStorage.getItem("totalSessions") || "0"}
              </div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">
                {localStorage.getItem("currentStreak") || "0"}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {Math.floor((parseInt(localStorage.getItem("totalMinutes") || "0")) / 60)}h
              </div>
              <div className="text-sm text-muted-foreground">Focus Time</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
