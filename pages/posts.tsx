import { Layout } from "@/components/Layout";
import { AllPosts } from "@/components/AllPosts";

const Posts: React.FC = () => {
  return (
    <Layout title="投稿一覧">
      <AllPosts />
    </Layout>
  );
};

export default Posts;
