import { useState } from "react";
import PollCreator from "@/components/PollCreator";
import VotingInterface from "@/components/VotingInterface";
import ResultsDisplay from "@/components/ResultsDisplay";
import VoterStatus from "@/components/VoterStatus";
import UserSetup from "@/components/UserSetup";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type AppState = 'setup' | 'voting' | 'results';

interface Voter {
  id: string;
  name: string;
  hasVoted: boolean;
}

const MAX_VOTERS = 5;

export default function HomePage() {
  const [state, setState] = useState<AppState>('setup');
  const [pollTitle, setPollTitle] = useState("Where should we go for Sunday lunch?");
  const [choices, setChoices] = useState<string[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [showUserSetup, setShowUserSetup] = useState(false);

  const handleCreatePoll = (title: string, pollChoices: string[]) => {
    setPollTitle("Where should we go for Sunday lunch?");
    setChoices(pollChoices);
    setState('voting');
    setShowUserSetup(true);
  };

  const handleUserJoin = (name: string) => {
    setCurrentUserName(name);
    setShowUserSetup(false);
  };

  const handleVote = (choiceIndex: number) => {
    const userId = `voter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newVoter: Voter = {
      id: userId,
      name: currentUserName,
      hasVoted: true,
    };
    
    const updatedVoters = [...voters, newVoter];
    const updatedVotes = { ...votes, [userId]: choiceIndex.toString() };
    
    setVoters(updatedVoters);
    setVotes(updatedVotes);
    setCurrentUserName("");
    
    if (updatedVoters.length >= MAX_VOTERS) {
      setState('results');
    } else {
      setShowUserSetup(true);
    }
  };

  const handleReset = () => {
    setState('setup');
    setPollTitle("Where should we go for Sunday lunch?");
    setChoices([]);
    setVoters([]);
    setVotes({});
    setCurrentUserName("");
    setShowUserSetup(false);
  };

  const votesRemaining = MAX_VOTERS - voters.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dailey Family Sunday Lunch Vote</h1>
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

        {state === 'voting' && (
          <div className="space-y-8">
            {showUserSetup ? (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">{pollTitle}</h2>
                  <p className="text-muted-foreground">
                    Participant {voters.length + 1} of {MAX_VOTERS}
                  </p>
                </div>
                <UserSetup onJoin={handleUserJoin} />
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1fr,320px] gap-6 max-w-5xl mx-auto">
                <div>
                  <VotingInterface
                    title={pollTitle}
                    choices={choices}
                    onVote={handleVote}
                  />
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Voting as: <span className="font-medium">{currentUserName}</span>
                  </p>
                </div>
                <div>
                  <VoterStatus voters={voters} />
                  {votesRemaining > 0 && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      {votesRemaining} {votesRemaining === 1 ? 'vote' : 'votes'} remaining
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {state === 'results' && (
          <div className="grid lg:grid-cols-[1fr,320px] gap-6 max-w-5xl mx-auto">
            <div>
              <ResultsDisplay
                title={pollTitle}
                choices={choices}
                votes={votes}
                totalVoters={MAX_VOTERS}
              />
            </div>
            <div>
              <VoterStatus voters={voters} />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Pass the device to each participant to collect all {MAX_VOTERS} votes</p>
        </div>
      </footer>
    </div>
  );
}
