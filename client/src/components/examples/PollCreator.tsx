import PollCreator from '../PollCreator';

export default function PollCreatorExample() {
  return (
    <div className="p-8">
      <PollCreator 
        onCreatePoll={(title, choices) => {
          console.log('Poll created:', { title, choices });
        }} 
      />
    </div>
  );
}
