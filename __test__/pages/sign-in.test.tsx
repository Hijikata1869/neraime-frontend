import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAuth } from "@/components/UserAuth";

const user = userEvent.setup();

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: "/sign-in",
        }
    }
}));

test("Eメール入力欄", async () => {
    render(<UserAuth />);
    const textbox = screen.getByRole("textbox", {
        name: "Eメール",
    });
    const value = "test-user@example.com";
    await user.type(textbox, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
})

test("パスワード入力欄", async () => {
    render(<UserAuth />);
    const input = screen.getByLabelText("パスワード");
    const value = "test-user-pass";
    await user.type(input, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("新規登録ボタンを押すと、画面が切り替わること", async () => {
    render(<UserAuth />);
    const button = screen.getByRole("button", {
        name: "新規登録",
    });
    await user.click(button);
    const passwordConfirmationBox = screen.getByLabelText("パスワード（確認用）");
    expect(passwordConfirmationBox).toBeInTheDocument();
});