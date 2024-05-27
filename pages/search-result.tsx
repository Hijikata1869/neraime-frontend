import { Layout } from "@/components/Layout";
import { ResultsList } from "@/components/ResultsList";

const SearchResult: React.FC = () => {
  return (
    <Layout title="検索結果">
      <ResultsList />
    </Layout>
  );
};

export default SearchResult;
