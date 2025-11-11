import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Session {
  task: string;
  completedAt: string;
  duration: number;
  steps: string[];
}

const Journal = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    setSessions(storedSessions);
  }, []);

  const getReflectionPrompt = (task: string) => {
    const prompts = [
      `What did you learn while working on "${task}"?`,
      `How did you overcome any challenges with "${task}"?`,
      `What would you do differently next time for "${task}"?`,
      `What felt most satisfying about completing "${task}"?`,
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Progress Journal
            </h1>
          </div>
          <p className="text-muted-foreground">
            Reflect on your achievements and growth
          </p>
        </div>

        {sessions.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No sessions yet</h3>
            <p className="text-muted-foreground mb-6">
              Complete your first focus session to start your journal
            </p>
            <Button onClick={() => navigate("/focus")}>
              Start Your First Session
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {sessions.map((session, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{session.task}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(session.completedAt), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        {session.duration} minutes
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="border-l-2 border-primary/30 pl-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Steps Completed:
                    </h4>
                    <ul className="space-y-2">
                      {session.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm flex gap-2">
                          <span className="text-primary">✓</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Reflection Prompt:
                    </h4>
                    <p className="text-sm italic text-foreground/80">
                      {getReflectionPrompt(session.task)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {sessions.length > 0 && (
          <Card className="p-6 mt-8 bg-calm border-primary/10">
            <h3 className="font-semibold mb-4 text-center">Your Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {sessions.length}
                </div>
                <div className="text-sm text-muted-foreground">Completed Sessions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">
                  {sessions.reduce((acc, s) => acc + s.duration, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Minutes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {sessions.reduce((acc, s) => acc + s.steps.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Steps Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {sessions.length > 0
                    ? Math.round(sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length)
                    : 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Duration</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Journal;
