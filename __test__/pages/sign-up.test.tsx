import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAuth } from "@/components/UserAuth";

const user = userEvent.setup();

jest.mock("next/router", () => ({
    useRouter() {
        return {
            pathname: "/sign-up"
        }
    }
}));

test("ニックネーム入力欄", async () => {
    render(<UserAuth />);
    const textbox = screen.getByRole("textbox", {
        name: "ニックネーム"
    });
    const value = "test-user-nickname";
    await user.type(textbox, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("Eメール入力欄", async () => {
    render(<UserAuth />);
    const textbox = screen.getByRole("textbox", {
        name: "Eメール"
    });
    const value = "test-user@example.com";
    await user.type(textbox, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("パスワード入力欄", async () => {
    render(<UserAuth />);
    const input = screen.getByLabelText("パスワード");
    const value = "test-user-pass";
    await user.type(input, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("確認用パスワード入力欄", async () => {
    render(<UserAuth />);
    const input = screen.getByLabelText("パスワード（確認用）");
    const value = "test-user-pass";
    await user.type(input, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});