import VoterStatus from '../VoterStatus';

export default function VoterStatusExample() {
  const mockVoters = [
    { id: '1', name: 'Alice Johnson', hasVoted: true },
    { id: '2', name: 'Bob Smith', hasVoted: true },
    { id: '3', name: 'Charlie Davis', hasVoted: false },
    { id: '4', name: 'Diana Miller', hasVoted: true },
    { id: '5', name: 'Ethan Brown', hasVoted: false },
  ];

  return (
    <div className="p-8 max-w-sm">
      <VoterStatus 
        voters={mockVoters}
        currentVoterId="3"
      />
    </div>
  );
}
