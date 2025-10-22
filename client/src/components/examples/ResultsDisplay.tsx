import ResultsDisplay from '../ResultsDisplay';

export default function ResultsDisplayExample() {
  const mockVotes = {
    'voter1': '0',
    'voter2': '0',
    'voter3': '1',
    'voter4': '2',
  };

  return (
    <div className="p-8">
      <ResultsDisplay 
        title="What should we order for lunch?"
        choices={["Pizza", "Sushi", "Burgers", "Salad"]}
        votes={mockVotes}
        totalVoters={5}
      />
    </div>
  );
}
