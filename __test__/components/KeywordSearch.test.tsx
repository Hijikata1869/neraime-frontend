import { render, screen } from "@testing-library/react";
import { KeywordSearch } from "@/components/KeywordSearch";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}))


test("キーワード検索ページが表示されていること", () => {
    render(<KeywordSearch />);
    expect(screen.getAllByText("キーワード検索")).toHaveLength(2);
    expect(screen.getAllByText("検索")).toHaveLength(2);
});