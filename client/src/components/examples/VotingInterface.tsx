import VotingInterface from '../VotingInterface';

export default function VotingInterfaceExample() {
  return (
    <div className="p-8">
      <VotingInterface 
        title="What should we order for lunch?"
        choices={["Pizza", "Sushi", "Burgers", "Salad"]}
        onVote={(choiceIndex) => {
          console.log('Voted for choice:', choiceIndex);
        }}
      />
    </div>
  );
}
