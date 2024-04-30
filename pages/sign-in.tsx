import { Layout } from "@/components/Layout";
import { UserAuth } from "@/components/UserAuth";

const SignIn: React.FC = () => {
  return (
    <>
      <Layout title="ログイン">
        <UserAuth />
      </Layout>
    </>
  );
};

export default SignIn;
