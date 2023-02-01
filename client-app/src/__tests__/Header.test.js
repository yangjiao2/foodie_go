import React from "react";
import { fireEvent } from "@testing-library/react";
// import App from "./App";
// import Enzyme, { shallow, mount } from "enzyme";
// // import wait from "waait";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import categoryData from "../../testData/category";
// // test("renders learn react link", () => {
// //   const { getByText } = render(<App />);
// //   const linkElement = getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });
// import { NO_RESULT, LOADING_MESSAGE } from "../src/utils/constants";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Test <Header/> component", () => {
  const mockSetState = jest.fn();
  jest.mock("react", () => ({
    useState: (initial) => [initial, mockSetState],
  }));

  const initProvider = () => {
    console.log("categoryData!", categoryData);

    return (
      <MockedProvider mocks={categoryData} addTypename={false}>
        <Header category={""} setCategories={mockSetState} />
      </MockedProvider>
    );
  };

  it("renders components without errors", async () => {
    render(initProvider());
  });

  it("renders <DropDown /> and <select /> components", async () => {
    render(initProvider());

    await waitFor(() => {
      //   Expect <Dropdown /> to be rendered
      expect(screen.getByTestId("dropdown")).not.toBeNull();
      // screen.debug();
    });

    await waitFor(() => {
      // Expect <select /> to be rendered
      expect(screen.getByTestId("dropdown-selection")).not.toBeNull();
    });

    const dropdown = await screen.findByTestId("dropdown-selection");
    // default option + selectable option count
    expect(dropdown).toHaveLength(
      1 + categoryData[0].result.data.categories.length
    );
  });

  it("renders <ListView /> correctly with callback upon user select option", async () => {
    const dropdown = await screen.findByTestId("dropdown-selection");
    userEvent.selectOptions(dropdown, screen.getByTestId("select-option-1"));
    const selectValue = categoryData[0].result.data.categories[1].title;
    userEvent.selectOptions(dropdown, selectValue);

    expect(mockSetState).toHaveBeenLastCalledWith(selectValue);
  });
});
