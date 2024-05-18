import { useState } from "react";

import { Layout } from "@/components/Layout";

type Candidates = {
  name: string;
  formatted_address: string;
}[];

const Search: React.FC = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidates>();

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value);
  };

  const onClickSearch = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/searchPlace?placeName=${placeName}`);
    const result = response.json();
    result
      .then(async (data) => {
        setPlaceName("");
        const candidates: Candidates = await data.results;
        return candidates;
      })
      .then((candidates) => {
        // formatted_addressから「日本」と郵便番号を除いた住所をcandidatesにセット
        const formatted_candidates = candidates.map((candidate) => {
          let address = candidate.formatted_address;
          address = address.replace(/日本、〒\d{3}-\d{4}\s/, "");
          return {
            name: candidate.name,
            formatted_address: address,
          };
        });
        return formatted_candidates;
      })
      .then((formatted_candidates) => {
        setCandidates(formatted_candidates);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Layout title="店舗検索">
        <form>
          <label htmlFor="search">検索</label>
          <input
            id="search"
            className="p-2"
            type="text"
            name="search"
            value={placeName}
            onChange={(event) => onChangeInputValue(event)}
          />
          <button
            className="p-2 text-white bg-black ml-2 rounded"
            onClick={(event) => onClickSearch(event)}
          >
            検索
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Search;
