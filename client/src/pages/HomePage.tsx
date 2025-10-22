import { useState } from "react";
import PollCreator from "@/components/PollCreator";
import VotingInterface from "@/components/VotingInterface";
import ResultsDisplay from "@/components/ResultsDisplay";
import VoterStatus from "@/components/VoterStatus";
import UserSetup from "@/components/UserSetup";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type AppState = 'setup' | 'user-join' | 'voting' | 'results';

interface Voter {
  id: string;
  name: string;
  hasVoted: boolean;
}

export default function HomePage() {
  const [state, setState] = useState<AppState>('setup');
  const [pollTitle, setPollTitle] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");

  const handleCreatePoll = (title: string, pollChoices: string[]) => {
    setPollTitle(title);
    setChoices(pollChoices);
    setState('user-join');
  };

  const handleUserJoin = (name: string) => {
    const userId = `voter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setCurrentUserId(userId);
    setCurrentUserName(name);
    
    const newVoter: Voter = {
      id: userId,
      name: name,
      hasVoted: false,
    };
    
    setVoters([newVoter]);
    setState('voting');
  };

  const handleVote = (choiceIndex: number) => {
    setVotes({ ...votes, [currentUserId]: choiceIndex.toString() });
    setVoters(voters.map(v => 
      v.id === currentUserId ? { ...v, hasVoted: true } : v
    ));
    
    if (voters.filter(v => v.hasVoted).length + 1 >= 5 || voters.length >= 5) {
      setState('results');
    }
  };

  const handleReset = () => {
    setState('setup');
    setPollTitle("");
    setChoices([]);
    setVoters([]);
    setVotes({});
    setCurrentUserId("");
    setCurrentUserName("");
  };

  const currentUserVote = votes[currentUserId];
  const hasVoted = currentUserVote !== undefined;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">VoteNow</h1>
          <div className="flex items-center gap-2">
            {state !== 'setup' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                data-testid="button-reset"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New Poll
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {state === 'setup' && (
          <PollCreator onCreatePoll={handleCreatePoll} />
        )}

        {state === 'user-join' && (
          <UserSetup onJoin={handleUserJoin} />
        )}

        {state === 'voting' && (
          <div className="grid lg:grid-cols-[1fr,320px] gap-6 max-w-5xl mx-auto">
            <div>
              <VotingInterface
                title={pollTitle}
                choices={choices}
                onVote={handleVote}
                hasVoted={hasVoted}
                selectedChoice={currentUserVote !== undefined ? parseInt(currentUserVote) : undefined}
              />
            </div>
            <div>
              <VoterStatus 
                voters={voters}
                currentVoterId={currentUserId}
              />
            </div>
          </div>
        )}

        {state === 'results' && (
          <div className="grid lg:grid-cols-[1fr,320px] gap-6 max-w-5xl mx-auto">
            <div>
              <ResultsDisplay
                title={pollTitle}
                choices={choices}
                votes={votes}
                totalVoters={5}
              />
            </div>
            <div>
              <VoterStatus 
                voters={voters}
                currentVoterId={currentUserId}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Create polls and collect votes from up to 5 participants</p>
        </div>
      </footer>
    </div>
  );
}
