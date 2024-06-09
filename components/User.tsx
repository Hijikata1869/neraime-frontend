import { memo } from "react";

export const User: React.FC = memo(() => {
  return (
    <>
      <h1>User page</h1>
    </>
  );
});

User.displayName = "User";
