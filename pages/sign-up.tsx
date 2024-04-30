import { Layout } from "@/components/Layout";
import { UserAuth } from "@/components/UserAuth";

const SignUp: React.FC = () => {
  return (
    <>
      <Layout title="新規登録">
        <UserAuth />
      </Layout>
    </>
  );
};

export default SignUp;
