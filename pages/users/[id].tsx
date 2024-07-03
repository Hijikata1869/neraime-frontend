import { memo } from "react";
import { Layout } from "@/components/Layout";
import { User } from "@/components/User";

const UserPage: React.FC = memo(() => {
  return (
    <Layout title="マイページ">
      <User />
    </Layout>
  );
});

UserPage.displayName = "UserPage";

export default UserPage;
