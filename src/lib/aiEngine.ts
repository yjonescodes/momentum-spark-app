// AI Engine - Placeholder logic for momentum plans and motivation
// This can be replaced with actual LLM API integration in the future

export const generateMomentumPlan = (task: string): string[] => {
  const taskLower = task.toLowerCase();
  
  // Template-based momentum plans
  if (taskLower.includes("essay") || taskLower.includes("write") || taskLower.includes("article")) {
    return [
      "Open your document or writing tool",
      "Write a quick outline with 3-5 main points",
      "Start with one sentence for your introduction",
      "Expand that sentence into a paragraph",
      "Continue with your first main point",
    ];
  }
  
  if (taskLower.includes("study") || taskLower.includes("learn") || taskLower.includes("read")) {
    return [
      "Gather your materials and find a comfortable spot",
      "Skim through the first section to get an overview",
      "Read the first paragraph carefully",
      "Take brief notes on key concepts",
      "Continue reading with active engagement",
    ];
  }
  
  if (taskLower.includes("code") || taskLower.includes("program") || taskLower.includes("debug")) {
    return [
      "Open your IDE or code editor",
      "Review the requirements or problem statement",
      "Write a simple comment outlining your approach",
      "Implement the first small function or component",
      "Test and iterate on your initial code",
    ];
  }
  
  if (taskLower.includes("email") || taskLower.includes("message") || taskLower.includes("respond")) {
    return [
      "Open your email or messaging app",
      "Read through the message you need to respond to",
      "Write a one-sentence summary of your main point",
      "Expand it into a brief, clear response",
      "Review and send your message",
    ];
  }
  
  // Generic momentum plan
  return [
    "Set up your workspace and remove distractions",
    "Break down the task into the smallest first step",
    "Take that first step - even if it's tiny",
    "Build on that momentum with the next action",
    "Keep going - you're already in motion!",
  ];
};

export const generateMotivation = (): string => {
  const motivations = [
    "Every expert was once a beginner. You've got this!",
    "The hardest part is starting. You're already here!",
    "Progress, not perfection. Let's make it happen.",
    "Small steps lead to big achievements. Keep going!",
    "You're building something amazing, one focus session at a time.",
    "Discipline is choosing between what you want now and what you want most.",
    "The secret to getting ahead is getting started. You're doing great!",
    "Focus is your superpower. Use it wisely.",
    "Every minute of focused work brings you closer to your goals.",
    "You showed up. That's already a win. Now let's focus!",
  ];
  
  return motivations[Math.floor(Math.random() * motivations.length)];
};

export const generateSessionSummary = (task: string, duration: number, steps: string[]): string => {
  return `Great work! You focused on "${task}" for ${duration} minutes and completed ${steps.length} momentum steps. This kind of consistency builds real progress.`;
};

export const generateReflectionPrompt = (task: string): string => {
  const prompts = [
    `What did you learn while working on "${task}"?`,
    `How did you overcome any challenges with "${task}"?`,
    `What would you do differently next time?`,
    `What felt most satisfying about this session?`,
    `What's the next small step you can take with "${task}"?`,
  ];
  
  return prompts[Math.floor(Math.random() * prompts.length)];
};
