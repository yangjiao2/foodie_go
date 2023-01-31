import React from "react";
// import { render } from "@testing-library/react";
import App from "./App";
import Enzyme, { shallow, mount } from "enzyme";
// import wait from "waait";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import businessData from "../testData/business";
// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import { GET_BUSINESS } from "../src/App";
import "@testing-library/jest-dom";

// console.log("businessData", businessData);
describe("Testing <App/> ", () => {
  // it("renders components without errors", async () => {
  //   render(
  //     <MockedProvider mocks={businessData} addTypename={false}>
  //       <App />
  //     </MockedProvider>
  //   );
  // });

  it("should render loading state initially", async () => {
    const { queryByLabelText, getByLabelText } = render(
      <MockedProvider mocks={businessData} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("renders <Header /> and <ListView /> components", async () => {
    const { queryByLabelText, getByLabelText } = render(
      <MockedProvider mocks={businessData} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => {
      //   Exepct Header to be rendered
      expect(
        document.getElementsByClassName("header-container")
      ).not.toBeNull();
      //   Exepct ListView to be rendered
      expect(
        document.getElementsByClassName("listview-container")
      ).not.toBeNull();
    });
  });

  it("renders <ListView /> correctly with provided empty dataset", async () => {
    let emptyData = [...businessData];
    emptyData[0].result = {
      data: {
        business: [],
      },
    };
    // console.log(businessData);
    // console.log(emptyData);
    render(
      <MockedProvider mocks={emptyData} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => {
      // const select = screen.getByTestId("dropdown-selection");
      // userEvent.click(select);
      // screen.debug();
      const noResultView = screen.getByTestId("no-result");
      expect(noResultView).toBeInTheDocument();
    });

    // expect(await screen.getByRole("select")).toBeInTheDocument();
    // expect(screen.getByRole("select")).toBeInTheDocument();
    // expect(wrapper.find('CartItem')).toHaveLength(1);
  });

  // it("renders <ListView /> correctly with provided mock data", async () => {
  //   render(
  //     <MockedProvider mocks={businessData} addTypename={false}>
  //       <App />
  //     </MockedProvider>
  //   );

  //   expect(screen.getByRole("select")).not.toBeDisabled();
  //   // expect(wrapper.find('CartItem')).toHaveLength(1);
  // });
});
