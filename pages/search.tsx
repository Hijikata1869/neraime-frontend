import { Layout } from "@/components/Layout";
import { KeywordSearch } from "@/components/KeywordSearch";
import { PrefectureSearch } from "@/components/PrefectureSearch";

const Search: React.FC = () => {
  return (
    <Layout title="店舗検索">
      <KeywordSearch />
      <PrefectureSearch />
    </Layout>
  );
};

export default Search;
