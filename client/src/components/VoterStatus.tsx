import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Users } from "lucide-react";

interface Voter {
  id: string;
  name: string;
  hasVoted: boolean;
}

interface VoterStatusProps {
  voters: Voter[];
  currentVoterId?: string;
}

export default function VoterStatus({ voters, currentVoterId }: VoterStatusProps) {
  const votedCount = voters.filter(v => v.hasVoted).length;
  const totalVoters = voters.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-medium">Participants</CardTitle>
        <Badge variant="secondary" data-testid="text-vote-count">
          {votedCount}/{totalVoters}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {voters.map((voter) => (
            <div
              key={voter.id}
              data-testid={`voter-status-${voter.id}`}
              className={`flex items-center justify-between p-2 rounded-md ${
                voter.id === currentVoterId ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {voter.hasVoted ? (
                  <CheckCircle2 className="h-4 w-4 text-chart-3" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm">
                  {voter.name}
                  {voter.id === currentVoterId && (
                    <span className="text-muted-foreground ml-1">(You)</span>
                  )}
                </span>
              </div>
              {voter.hasVoted && (
                <Badge variant="outline" className="text-xs">
                  Voted
                </Badge>
              )}
            </div>
          ))}
        </div>

        {votedCount === totalVoters && totalVoters > 0 && (
          <div className="mt-4 p-3 bg-chart-3/10 rounded-md flex items-center gap-2">
            <Users className="h-4 w-4 text-chart-3" />
            <span className="text-sm font-medium text-chart-3">All votes collected!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
