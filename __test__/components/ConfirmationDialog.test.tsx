import { Dispatch, SetStateAction} from "react";
import { render, screen } from "@testing-library/react";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

const mockSetIsOpen: Dispatch<SetStateAction<boolean>> = jest.fn();

test("ダイアログが画面に表示されていること", () => {
    render(<ConfirmationDialog isOpen={true} setIsOpen={mockSetIsOpen} dialogTitle="mockTitle" dialogDescription="mockDialogDescription" />);
    expect(screen.getByText("mockTitle")).toBeInTheDocument();
    expect(screen.getByText("mockDialogDescription")).toBeInTheDocument();
    expect(screen.getByText("削除する")).toBeInTheDocument();
    expect(screen.getByText("キャンセル")).toBeInTheDocument();
})