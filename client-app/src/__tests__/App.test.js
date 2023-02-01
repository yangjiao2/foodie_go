import React from "react";
import App from "../App";
import { render } from "@testing-library/react";
import businessData from "../../testData/business";
import { MockedProvider } from "@apollo/client/testing";

import "@testing-library/jest-dom";

describe("Test <App/> component", () => {
  const initProvider = () => {
    <MockedProvider mocks={businessData} addTypename={false}>
      <App />
    </MockedProvider>;
  };

  it("renders components without errors", async () => {
    render(initProvider());
  });
});
