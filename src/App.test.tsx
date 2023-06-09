import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders course project page", () => {
    render(<App />);

    const title = screen.getByText(/by/i);
    console.log(title);

    expect(title).toBeInTheDocument();
});
