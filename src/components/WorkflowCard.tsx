import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface WorkflowCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onExecute: () => Promise<void>;
  delay?: number;
}

export function WorkflowCard({
  icon,
  title,
  description,
  buttonText,
  onExecute,
  delay = 0,
}: WorkflowCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onExecute();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-card rounded-2xl p-6 shadow-card border border-border/50 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
        <span className="text-accent-foreground">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        {description}
      </p>
      <Button
        variant="workflow"
        size="lg"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Executando...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
}
