import { Layout } from "@/components/Layout";
import { PrefectureSearchResultList } from "@/components/PrefectureSearchResultList";

const PrefectureSearchResult: React.FC = () => {
  return (
    <Layout title="都道府県検索結果">
      <PrefectureSearchResultList />
    </Layout>
  );
};

export default PrefectureSearchResult;
