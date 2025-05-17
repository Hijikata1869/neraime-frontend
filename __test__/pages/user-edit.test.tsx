import { render, screen, waitFor } from "@testing-library/react";
import UserEditPage from "@/pages/users/[id]/edit";
import * as userFetchers from "@/lib/users";
import { CurrentUserContext } from "@/context/CurrentUserContext";

// Layoutコンポーネントの中の関数が上手くいってない？可能性が高そうなので、
// CurrentUserContextでテスト対象のコンポーネントを囲むとこから始めたい

jest.mock("@/utiles/font", () => {
    return {
        bebasNeue: {
            className: "mocked-class-name"
        }
    }
})

jest.mock("next/router", () => ({
    useRouter() {
        return {
            query: {
                id: "1",
            }
        }
    }
}));

const testCurrentUser = {
    id: 1,
    nickname: "test_user",
    email: "test@example.com",
    password_digest: "test_pass",
    self_introduction: "test,self,introduction",
    created_at: "yy年MM月dd日",
    updated_at: "yy年MM月dd日"
};

const mockFn = jest.fn();

describe("/user/[id]/edit", () => {

    beforeEach(() => {
        jest.spyOn(userFetchers, "fetchUser").mockResolvedValueOnce({
            user: {
                nickname: "test_user",
                email: "test@example.com",
                self_introduction: "test,self,introduction",
            }
        });
        jest.spyOn(userFetchers, "fetchCurrentUser").mockResolvedValueOnce({
            current_user: testCurrentUser,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("ログイン中のユーザー情報編集ページが表示されていること", async () => {
        render(
            <CurrentUserContext.Provider value={{
                currentUser: testCurrentUser,
                setCurrentUser: mockFn,
                isLogin: true,
                setIsLogin: mockFn,
            }}>
                <UserEditPage />
            </CurrentUserContext.Provider>
        );
        await waitFor(() => expect(screen.getByDisplayValue("test_user")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByDisplayValue("test,self,introduction")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByRole("button", { name: "更新する"})).toBeInTheDocument());
        await waitFor(() => expect(screen.getByRole("button", { name: "マイページに戻る"})).toBeInTheDocument());
        await waitFor(() => expect(screen.getByRole("button", { name: "アカウントを削除する"})).toBeInTheDocument());
    });

    test("非ログイン時のユーザー情報編集ページが表示されていること", async () => {
        render(
            <CurrentUserContext.Provider value={{
                currentUser: {...testCurrentUser, id: 2},
                setCurrentUser: mockFn,
                isLogin: true,
                setIsLogin: mockFn,
            }}>
                <UserEditPage />
            </CurrentUserContext.Provider>
        );
        await waitFor(() => expect(screen.getByDisplayValue("test_user")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByDisplayValue("test,self,introduction")).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText("更新する")).not.toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText("マイページに戻る")).not.toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText("アカウントを削除する")).not.toBeInTheDocument());
    });
});
