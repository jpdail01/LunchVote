import UserSetup from '../UserSetup';

export default function UserSetupExample() {
  return (
    <div className="p-8">
      <UserSetup 
        onJoin={(name) => {
          console.log('User joined:', name);
        }} 
      />
    </div>
  );
}
