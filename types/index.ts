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
