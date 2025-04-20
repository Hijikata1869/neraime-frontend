import { render, screen } from "@testing-library/react";
import { PrefectureSearch } from "@/components/PrefectureSearch";

jest.mock("next/router", () => ({
    useRouter: () => jest.fn(),
}));

test("都道府県検索コンポーネントが表示されていること", () => {
    render(<PrefectureSearch />);
    expect(screen.getByText("都道府県検索")).toBeInTheDocument();
});