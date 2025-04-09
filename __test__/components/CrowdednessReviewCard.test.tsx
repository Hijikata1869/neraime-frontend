import { render, screen } from "@testing-library/react";
import { CrowdednessReviewCard } from "@/components/CrowdednessReviewCard";
import { LatestPosts } from "@/types/crowdedness";

const mockFn = jest.fn();

const crowdednessReviewCardData: LatestPosts | undefined = [
    {
        id: 1,
        user_id: 1,
        store_id: 1,
        nickname: "mockuser",
        store_name: "mockstore",
        day_of_week: "月曜日",
        time: "0:00",
        level: "混雑",
        memo: "mockcomment",
        created_at: "yyyy年MM月dd日",
        updated_at: "yyyy年MM月dd日",
        url: "/",
        number_of_usefuls: 1,
        is_useful: false,
    }
];

test("カードが画面に表示されること", () => {
    render(<CrowdednessReviewCard reviews={crowdednessReviewCardData} reFetchPost={mockFn} />);
    expect(screen.getByText("mockuser")).toBeInTheDocument();
    expect(screen.getByText("mockstore")).toBeInTheDocument();
    expect(screen.getAllByText(/月曜日/)).toHaveLength(2);
    expect(screen.getAllByText(/0:00/)).toHaveLength(2);
    expect(screen.getAllByText(/yyyy年MM月dd日/)).toHaveLength(2);
    expect(screen.getAllByText(/混雑/)).toHaveLength(2);
    expect(screen.getByText("mockcomment")).toBeInTheDocument();
})

