import { Layout } from "@/components/Layout";
import { IndexPage } from "@/components/IndexPage";
import { LatestAllPosts } from "@/components/LatestAllPosts";

export default function Home() {
  return (
    <Layout title="Neraime">
      <IndexPage />
      <LatestAllPosts />
    </Layout>
  );
}
