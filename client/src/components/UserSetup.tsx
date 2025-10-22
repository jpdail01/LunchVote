import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface UserSetupProps {
  onJoin: (name: string) => void;
}

export default function UserSetup({ onJoin }: UserSetupProps) {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (name.trim()) {
      onJoin(name.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <CardTitle>Join the Poll</CardTitle>
        </div>
        <CardDescription>Enter your name to participate in voting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user-name">Your Name</Label>
          <Input
            id="user-name"
            data-testid="input-user-name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            maxLength={50}
            autoFocus
          />
        </div>

        <Button
          data-testid="button-join-poll"
          className="w-full"
          onClick={handleJoin}
          disabled={!name.trim()}
        >
          Join Poll
        </Button>
      </CardContent>
    </Card>
  );
}
