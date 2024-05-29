import { Layout } from "@/components/Layout";
import { CreateStore } from "@/components/CreateStore";

const CreateStorePage: React.FC = () => {
  return (
    <Layout title="店舗登録">
      <CreateStore />
    </Layout>
  );
};

export default CreateStorePage;
