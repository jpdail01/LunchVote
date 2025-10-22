import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PollCreatorProps {
  onCreatePoll: (title: string, choices: string[]) => void;
}

export default function PollCreator({ onCreatePoll }: PollCreatorProps) {
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState<string[]>(["", ""]);
  const [newChoice, setNewChoice] = useState("");

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices.filter(c => c.trim()), newChoice.trim()]);
      setNewChoice("");
    }
  };

  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const updateChoice = (index: number, value: string) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleCreate = () => {
    const validChoices = choices.filter(c => c.trim());
    if (title.trim() && validChoices.length >= 2) {
      onCreatePoll(title.trim(), validChoices);
    }
  };

  const isValid = title.trim() && choices.filter(c => c.trim()).length >= 2;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a Poll</CardTitle>
        <CardDescription>Set up your poll with a title and at least 2 choices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="poll-title">Poll Title</Label>
          <Input
            id="poll-title"
            data-testid="input-poll-title"
            placeholder="What should we order for lunch?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

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
              {choices.length > 2 && (
                <Button
                  data-testid={`button-remove-choice-${index}`}
                  size="icon"
                  variant="ghost"
                  onClick={() => removeChoice(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          <div className="flex gap-2">
            <Input
              data-testid="input-new-choice"
              placeholder="Add another choice"
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addChoice()}
              maxLength={80}
            />
            <Button
              data-testid="button-add-choice"
              size="icon"
              variant="secondary"
              onClick={addChoice}
              disabled={!newChoice.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
