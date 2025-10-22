import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface ResultsDisplayProps {
  title: string;
  choices: string[];
  votes: Record<string, string>;
  totalVoters: number;
}

export default function ResultsDisplay({ 
  title, 
  choices, 
  votes,
  totalVoters 
}: ResultsDisplayProps) {
  const voteCounts = choices.map((_, index) => {
    return Object.values(votes).filter(vote => vote === index.toString()).length;
  });

  const maxVotes = Math.max(...voteCounts);
  const totalVotes = voteCounts.reduce((sum, count) => sum + count, 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {totalVotes} of {totalVoters} votes collected
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {choices.map((choice, index) => {
          const count = voteCounts[index];
          const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
          const isWinner = count === maxVotes && count > 0;

          return (
            <div
              key={index}
              data-testid={`result-choice-${index}`}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isWinner && <Trophy className="h-4 w-4 text-accent" />}
                  <span className="font-medium">{choice}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground" data-testid={`vote-count-${index}`}>
                    {count} {count === 1 ? 'vote' : 'votes'}
                  </span>
                  <span className="text-sm font-semibold min-w-[3rem] text-right" data-testid={`vote-percentage-${index}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
