import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";
import { bebasNeue } from "@/utiles/font";

jest.mock("@/utiles/font", () => {
    return {
        bebasNeue: {
            className: "mocked-class-name"
        }
    }
})

test("フッターが表示されていること", () => {
    render(<Footer />);
    expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
    expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
    expect(screen.getByText("NERAIMEについて")).toBeInTheDocument();
})