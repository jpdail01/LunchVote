import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

interface VotingInterfaceProps {
  title: string;
  choices: string[];
  onVote: (choiceIndex: number) => void;
  hasVoted?: boolean;
  selectedChoice?: number;
}

export default function VotingInterface({ 
  title, 
  choices, 
  onVote,
  hasVoted = false,
  selectedChoice
}: VotingInterfaceProps) {
  const [selected, setSelected] = useState<number | null>(selectedChoice ?? null);

  const handleSubmit = () => {
    if (selected !== null) {
      onVote(selected);
    }
  };

  if (hasVoted && selectedChoice !== undefined) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-chart-3" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>You voted for: {choices[selectedChoice]}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Waiting for other participants to vote...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Select your choice and submit your vote</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selected?.toString()}
          onValueChange={(value) => setSelected(parseInt(value))}
        >
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <div
                key={index}
                data-testid={`choice-option-${index}`}
                className="flex items-center space-x-3 p-4 rounded-md border hover-elevate active-elevate-2 cursor-pointer"
                onClick={() => setSelected(index)}
              >
                <RadioGroupItem value={index.toString()} id={`choice-${index}`} />
                <Label
                  htmlFor={`choice-${index}`}
                  className="flex-1 cursor-pointer text-base"
                >
                  {choice}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <Button
          data-testid="button-submit-vote"
          className="w-full"
          onClick={handleSubmit}
          disabled={selected === null}
        >
          Submit Vote
        </Button>
      </CardContent>
    </Card>
  );
}
