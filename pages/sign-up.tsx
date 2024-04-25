import { Layout } from "@/components/Layout";
import { UserAuth } from "@/components/UserAuth";

const SignUp: React.FC = () => {
  return (
    <>
      <Layout title="sign-up">
        <UserAuth />
      </Layout>
    </>
  );
};

export default SignUp;
