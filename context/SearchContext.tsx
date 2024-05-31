import { ReactNode, createContext, useState } from "react";
import { StoreCandidates, SelectedCandidate } from "@/types/store";

export const SearchContext = createContext(
  {} as {
    candidates: StoreCandidates | undefined;
    setCandidates: React.Dispatch<React.SetStateAction<StoreCandidates>>;
    selectedCandidate: SelectedCandidate | undefined;
    setSelectedCandidate: React.Dispatch<
      React.SetStateAction<SelectedCandidate>
    >;
  }
);

type Props = {
  children: ReactNode;
};

export const SearchContextProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [candidates, setCandidates] = useState<StoreCandidates>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<SelectedCandidate>(
    { name: "", address: "" }
  );

  return (
    <SearchContext.Provider
      value={{
        candidates,
        setCandidates,
        selectedCandidate,
        setSelectedCandidate,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
