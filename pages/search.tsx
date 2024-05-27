import { Layout } from "@/components/Layout";
import { SearchForm } from "@/components/SearchForm";

const Search: React.FC = () => {
  return (
    <Layout title="店舗検索">
      <SearchForm />
    </Layout>
  );
};

export default Search;
