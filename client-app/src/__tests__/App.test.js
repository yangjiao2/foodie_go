import React from "react";
// import { render } from "@testing-library/react";
import App from "../App";
import Enzyme, { shallow, mount } from "enzyme";
// import wait from "waait";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import businessData from "../../testData/business";
// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import { NO_RESULT, LOADING_MESSAGE } from "../utils/constants";
import "@testing-library/jest-dom";

// console.log("businessData", businessData);
describe("Test <App/> component", () => {
  const initProvider = () => (
    <MockedProvider mocks={businessData} addTypename={false}>
      <App />
    </MockedProvider>
  );
  it("renders components without errors", async () => {
    render(initProvider());
  });

  it("should render loading state initially", async () => {
    render(initProvider());

    expect(await screen.findByText(LOADING_MESSAGE)).toBeInTheDocument();
  });

  it("renders <Header /> and <ListView /> components", async () => {
    render(initProvider());
    await waitFor(() => {
      //   Expect <Header /> to be rendered by checking data-testid
      expect(screen.getByTestId("header-container")).not.toBeNull();
    });
    await waitFor(() => {
      //   Expect <ListView /> to be rendered by checking data-testid
      expect(screen.getByTestId("listview-container")).not.toBeNull();
    });
  });

  it("renders <ListView /> correctly with provided empty dataset", async () => {
    let emptyData = [...businessData];
    emptyData[0].result = {
      data: {
        business: [],
      },
    };

    render(
      <MockedProvider mocks={emptyData} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      const noResultView = screen.getByTestId("no-result");
      expect(noResultView).toHaveTextContent(NO_RESULT);
    });
  });
});
