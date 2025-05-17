import { Dispatch, SetStateAction } from "react";
import { render, screen } from "@testing-library/react";
import { HumbergerMenu } from "@/components/HumbergerMenu";

const mockSetIsOpen: Dispatch<SetStateAction<boolean>> = jest.fn();
const mockLogout: () => void = jest.fn();

const mockCurrentUser = {
    id: 1,
    nickname: "mockCurrentUser",
    email: "mockEmail@example.com",
    password_digest: "mockPasswordDigest",
    self_introduction: "mock_self_introductioh",
    created_at: "yyyy年mm月dd日",
    updated_at: "yyyy年mm月dd日",
};

describe("ハンバーガーメニューの表示", () => {
    describe("ログイン時", () => {
        test("ログイン時のハンバーガーメニューが表示されること", () => {
            render(<HumbergerMenu 
                isOpen={true} 
                setIsOpen={mockSetIsOpen} 
                currentUser={mockCurrentUser} 
                isLogin={true} 
                logout={mockLogout} 
                />);
            expect(screen.getByText("混雑度検索")).toBeInTheDocument();
            expect(screen.getByText("マイページ")).toBeInTheDocument();
            expect(screen.getByText("ログアウト")).toBeInTheDocument();
        });
    });

    describe("非ログイン時", () => {
        test("非ログイン時のハンバーガーメニューが表示されること", () => {
            render(<HumbergerMenu 
                isOpen={false} 
                setIsOpen={mockSetIsOpen} 
                currentUser={undefined} 
                isLogin={false} 
                logout={mockLogout} 
                />);
            expect(screen.getByText("ログイン")).toBeInTheDocument();
            expect(screen.getByText("新規登録")).toBeInTheDocument();
        })
    })
});

