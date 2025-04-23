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
});

test("フッターのリンクが正しく遷移すること", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", {
        name: "プライバシーポリシー"
    })
    const contactLink = screen.getByRole("link", {
        name: "お問い合わせ"
    })
    const aboutLink = screen.getByRole("link", {
        name: "NERAIMEについて"
    })
    expect(privacyLink).toHaveAttribute("href", "/privacy");
    expect(contactLink).toHaveAttribute("href", "/contact");
    expect(aboutLink).toHaveAttribute("href", "/about");
});