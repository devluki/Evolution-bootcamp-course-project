import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App />);
    const gameTitle = screen.getByText(/blackjack/i);
    expect(gameTitle).toBeInTheDocument();
});
