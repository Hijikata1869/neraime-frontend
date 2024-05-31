import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext";

import { StoreCandidates } from "@/types/store";

export const SearchForm: React.FC = () => {
  const { setCandidates } = useContext(SearchContext);
  const router = useRouter();
  const [placeName, setPlaceName] = useState<string>("");

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value);
  };

  const onClickSearch = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/textSearch?placeName=${placeName}`);
    const result = response.json();
    result
      .then(async (data) => {
        setPlaceName("");
        const candidates: StoreCandidates = await data.results;
        return candidates;
      })
      .then((candidates) => {
        // formatted_addressから「日本」と郵便番号を除いた住所をcandidatesにセット
        const formatted_candidates = candidates
          .map((candidate) => {
            let address = candidate.formatted_address;
            address = address.replace(/日本、〒\d{3}-\d{4}\s/, "");
            return {
              place_id: candidate.place_id,
              name: candidate.name,
              formatted_address: address,
              types: candidate.types,
            };
          })
          .filter((candidate) => !candidate.types.includes("street_address"));
        return formatted_candidates;
      })
      .then((formatted_candidates) => {
        setCandidates(formatted_candidates);
      })
      .then(() => {
        router.push("/search-result");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <form className="flex flex-col w-full lg:px-80 pt-8">
        <div className="flex items-center">
          <label htmlFor="search" className="text-gray-900 text-xl mr-4">
            キーワード検索
          </label>
          <input
            id="search"
            className="py-3 pl-2 focus: outline-none w-1/2 rounded-l"
            type="text"
            name="search"
            placeholder="施設名・エリア・キーワード"
            value={placeName}
            onChange={(event) => onChangeInputValue(event)}
          />
          <button
            className="py-3 px-6 text-amber-50 rounded-r bg-emerald-700 hover:bg-emerald-950"
            onClick={(event) => onClickSearch(event)}
          >
            検索
          </button>
        </div>
      </form>
    </>
  );
};
