import { render, screen } from "@testing-library/react";
import { SuccessAlert } from "@/components/SuccessAlert";
import NotificationContext from "@/context/notificationContext";

const mockFn = jest.fn();

test("SuccessAlertが表示されること", () => {
    render(<NotificationContext.Provider value={{
        notification: "success",
        notificationText: "成功しました",
        success: mockFn,
        error: mockFn,
        clear: mockFn
    }}>
        <SuccessAlert />
    </NotificationContext.Provider>)
    expect(screen.getByText("成功しました")).toBeInTheDocument();
})