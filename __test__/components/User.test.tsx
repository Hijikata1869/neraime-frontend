import { render, screen, waitFor } from "@testing-library/react";
import { User } from "@/components/User";
import * as UserFetchers from "@/lib/users";
import * as CrowdednessFetchers from "@/lib/crowdedness";
import * as FavoriteFetchers from "@/lib/favorites";
import { CurrentUserContext } from "@/context/CurrentUserContext";

const testCurrentUser = {
    id: 1,
    nickname: "test_user",
    email: "test@example.com",
    password_digest: "test_pass",
    self_introduction: "test,self,introduction",
    created_at: "yyyy年MM月dd日",
    updated_at: "yyyy年MM月dd日",
};

const mockFn = jest.fn();

jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: {
                id: "1",
            }
        }
    }
}));

describe("ユーザーの個人ページ", () => {
    beforeEach(() => {
        jest.spyOn(UserFetchers, "fetchUser").mockResolvedValueOnce({
            user: {
                id: 1,
                nickname: "test_user",
                email: "test@example.com",
                password_digest: "test_pass",
                self_introduction: "test,self,introduction",
                created_at: "yyyy年mm月dd日",
                updated_at: "yyyy年mm月dd日",
                url: "/"
            }
        })
        jest.spyOn(UserFetchers, "fetchCurrentUser").mockResolvedValueOnce({
            currentUser: testCurrentUser
        })
        jest.spyOn(CrowdednessFetchers, "fetchUserCrowdedness").mockResolvedValueOnce({
            user_crowdedness: [
                {
                    id: 1,
                    store_id: 1,
                    store_name: "test_store",
                    day_of_week: "月曜日",
                    time: "0:00",
                    level: "混雑",
                    memo: "test_memo",
                    created_at: "yyyy年mm月dd日",
                    updated_at: "yyyy年mm月dd日",
                    number_of_usefuls: 1,
                    is_useful: true,
                }
            ]
        });
        jest.spyOn(FavoriteFetchers, "fetchUserFavoriteStores").mockResolvedValueOnce({
            favorite_stores: [{
                id: 1,
                name: "test_store",
                address: "test_address",
                prefecture_id: 1,
                created_at: "yyyy年MM月dd日",
                updated_at: "yyyy年MM月dd日",
            }]
            
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("非ログイン時", async () => {
        render(
            <CurrentUserContext.Provider value={{
                currentUser: { ...testCurrentUser, id: 2 },
                setCurrentUser: mockFn,
                isLogin: false,
                setIsLogin: mockFn,
            }}>
                <User />
            </CurrentUserContext.Provider>
        );
        await waitFor(() => expect(screen.getByText("test_userさんのお気に入り店舗")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("test,self,introduction")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("test_userさんの投稿一覧")).toBeInTheDocument());    
        await waitFor(() => expect(screen.queryByText("登録情報を編集する")).not.toBeInTheDocument());
    });

    test("ログイン時", async () => {
        render(
            <CurrentUserContext.Provider value={{
                currentUser: testCurrentUser,
                setCurrentUser: mockFn,
                isLogin: true,
                setIsLogin: mockFn,
            }}>
                <User />
            </CurrentUserContext.Provider>
        );
        await waitFor(() => expect(screen.getByText("登録情報を編集する")).toBeInTheDocument());
    });
});
