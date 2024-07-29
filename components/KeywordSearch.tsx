import { useState, useContext, memo } from "react";
import { useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext";

import { StoreCandidates } from "@/types/store";

export const KeywordSearch: React.FC = memo(() => {
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
      <form className="flex flex-col w-full lg:px-40 md:px-20 px-10 pt-8">
        <div className="hidden md:block">
          <div className="flex items-center">
            <label
              htmlFor="search"
              className="text-gray-900 text-2xl mr-6 font-bold"
            >
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
              className="py-3 px-6 text-amber-50 rounded-r bg-cyan-600 hover:bg-cyan-700"
              onClick={(event) => onClickSearch(event)}
            >
              検索
            </button>
          </div>
        </div>
        <div className="md:hidden">
          <div className="flex flex-col">
            <label
              htmlFor="search"
              className="text-gray-900 text-2xl font-bold mb-4"
            >
              キーワード検索
            </label>
            <div className="flex w-full">
              <input
                id="search"
                className="py-2 pl-2 focus:outline-none rounded-l w-3/4 text-sm"
                type="text"
                name="search"
                placeholder="施設名・エリア・キーワード"
                value={placeName}
                onChange={(event) => onChangeInputValue(event)}
              />
              <button
                className="py-1 px-4 text-amber-50 rounded-r bg-cyan-600 hover:bg-cyan-700 w-1/4"
                onClick={(event) => onClickSearch(event)}
              >
                検索
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

KeywordSearch.displayName = "KeywordSearch";
