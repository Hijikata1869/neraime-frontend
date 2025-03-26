import { render, screen } from "@testing-library/react";
import { IndexPage } from "../../components/IndexPage";

test("混雑度検索、投稿ページへのリンクのボタンが表示されていること", () => {
    render(<IndexPage />);
    const button = screen.getByRole("button", {
        name: "混み具合を検索・投稿する →"
    })
    expect(button).toBeInTheDocument();
})