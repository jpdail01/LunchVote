import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface PollCreatorProps {
  onCreatePoll: (title: string, choices: string[]) => void;
}

export default function PollCreator({ onCreatePoll }: PollCreatorProps) {
  const [title] = useState("Where should we go for Sunday lunch?");
  const [choices, setChoices] = useState<string[]>(["", ""]);

  const updateChoice = (index: number, value: string) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleCreate = () => {
    const validChoices = choices.filter(c => c.trim());
    if (validChoices.length == 2) {
      onCreatePoll(title.trim(), validChoices);
    }
  };

  const isValid = choices.filter(c => c.trim()).length == 2;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a new Poll!</CardTitle>
        <CardDescription>Set up your poll with 2 choices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Choices</Label>
          {choices.map((choice, index) => (
            <div key={index} className="flex gap-2">
              <Input
                data-testid={`input-choice-${index}`}
                placeholder={`Choice ${index + 1}`}
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
                maxLength={80}
              />              
            </div>
          ))}
        </div>

        <Button
          data-testid="button-start-poll"
          className="w-full"
          onClick={handleCreate}
          disabled={!isValid}
        >
          Start Poll
        </Button>
      </CardContent>
    </Card>
  );
}
