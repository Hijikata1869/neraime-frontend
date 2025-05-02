import { render, screen } from "@testing-library/react";
import { CreateStore } from "@/components/CreateStore";
import { SearchContext } from "@/context/SearchContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";

const testCurrentUser = {
    id: 1,
    nickname: "test_user",
    email: "test_user@example.com",
    password_digest: "test_pass",
    created_at: "yyyy-mm-dd",
    updated_at: "yyyy-mm-dd",
}

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}))

const mockFn = jest.fn();

const testCandidateStore = [
    {
        place_id: "store_id", 
        name: "store_name", 
        formatted_address: "store_address", 
        types: ["spa"]
    }
];

const testSelectedCandidate = {
    name: "store_name",
    address: "store_address",
}

test("店舗の新規登録ページが表示されること", () => {
    render(
        <CurrentUserContext.Provider value={{
            currentUser: testCurrentUser,
            setCurrentUser: mockFn,
            isLogin: true,
            setIsLogin: mockFn
        }}>
            <SearchContext.Provider value={{
                candidates: testCandidateStore,
                setCandidates: mockFn,
                selectedCandidate: testSelectedCandidate,
                setSelectedCandidate: mockFn

            }}>
                <CreateStore />
            </SearchContext.Provider>
        </CurrentUserContext.Provider>
        );
        expect(screen.getByText(/store_name/)).toBeInTheDocument();
        expect(screen.getByText(/store_address/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "登録する" })).toBeInTheDocument();
});