import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";

export const ResultsList = () => {
  const searchContext = useContext(SearchContext);
  const { candidates } = searchContext;

  return (
    <>
      {candidates?.length ? null : (
        <p className="pt-10">
          検索結果はありませんでした。キーワードを変えて再度検索し直してください。
        </p>
      )}
      {candidates?.map((candidate) => (
        <div key={candidate.place_id}>
          <h1>{candidate.name}</h1>
          <p>{candidate.formatted_address}</p>
        </div>
      ))}
    </>
  );
};
