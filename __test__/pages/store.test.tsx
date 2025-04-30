import { render, screen, waitFor } from "@testing-library/react";
import { Store } from "@/components/Store";
import * as Fethcers from "@/lib/stores";

jest.mock("@/lib/stores");

jest.mock("next/router", () => ({
    useRouter() {
        return {
            query: {
                id: "1",
            }
        }
    }
}));

test("店舗の個別ページに店舗情報が表示されていること", async () => {
    jest.spyOn(Fethcers, "fetchStore").mockResolvedValueOnce({
        store: {
            id: 1,
            name: "test-store-name",
            address: "test-store-address",
            prefecture_id: 1,
            created_at: "2025-02-27T11:35:19.643Z",
            updated_at: "2025-02-27T11:35:19.643Z",
        }
    })
    render(<Store />);
    await waitFor(() => expect(screen.getByText("test-store-name")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("test-store-address")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("まだ混雑度情報がありません")).toBeInTheDocument());
});