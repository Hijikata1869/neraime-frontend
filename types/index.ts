import { ReactNode, Dispatch, SetStateAction } from "react";

export type LayoutProps = {
  title: string;
  children?: ReactNode;
};

export type ConfirmationDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  executeOnDialogAction: (arg: any) => any;
};

export type StoreCandidates = {
  place_id: string;
  name: string;
  formatted_address: string;
  types: string[];
}[];

export type SearchResultProps = {
  candidates: StoreCandidates;
};

export type SelectedCandidate = {
  name: string;
  address: string;
};

export type StoreCreateArgs = {
  name: string;
  address: string;
  prefecture: string;
};

export type StoreData = {
  id: number;
  name: string;
  address: string;
  prefecture_id: number;
  created_at: string;
  updated_at: string;
};
