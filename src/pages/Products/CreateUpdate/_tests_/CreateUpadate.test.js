import React from "react";

const header = "Anderson";

import { render, screen } from "@testing-library/react";
import CreateUpdate from "../CreateUpdate";

describe("CreateUpdate", () => {
  test("renders App component", () => {
    render(<CreateUpdate />);
    expect(screen.getByText(/Descrição/));
  });
});
