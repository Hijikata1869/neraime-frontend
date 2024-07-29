import { ReactNode, Dispatch, SetStateAction } from "react";
import { CurrentUserObj } from "./user";

export type LayoutProps = {
  title: string;
  children?: ReactNode;
};

export type ConfirmationDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dialogTitle: string;
  dialogDescription: string;
  executeOnDialogAction?: (arg: any) => any;
};

export type HumbergerMenuProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean | undefined;
  currentUser: CurrentUserObj | undefined;
  logout: () => void;
};
