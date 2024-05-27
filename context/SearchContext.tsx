import { ReactNode, createContext, useState } from "react";
import { StoreCandidates } from "@/types";

export const SearchContext = createContext(
  {} as {
    candidates: StoreCandidates | undefined;
    setCandidates: React.Dispatch<React.SetStateAction<StoreCandidates>>;
  }
);

type Props = {
  children: ReactNode;
};

export const SearchContextProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [candidates, setCandidates] = useState<StoreCandidates>([]);

  return (
    <SearchContext.Provider value={{ candidates, setCandidates }}>
      {children}
    </SearchContext.Provider>
  );
};
