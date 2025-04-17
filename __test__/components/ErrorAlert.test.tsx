import { render, screen } from "@testing-library/react";
import { ErrorAlert } from "@/components/ErrorAlert";
import NotificationContext from "@/context/notificationContext";

const mockFn = jest.fn();

test("エラーアラートが表示されること", () => {
    render(
        <NotificationContext.Provider value={
            {
                notification: "error",
                notificationText: "errorです",
                success: mockFn,
                error: mockFn,
                clear: mockFn
            }
        }>
            <ErrorAlert />
        </NotificationContext.Provider>
    );
    expect(screen.getByText("errorです")).toBeInTheDocument();
})

