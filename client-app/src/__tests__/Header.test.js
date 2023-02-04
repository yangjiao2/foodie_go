import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import categoryData from "../../testData/category";

import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Test <Header/> component", () => {
  const mockSetState = jest.fn();
  jest.mock("react", () => ({
    useState: (initial) => [initial, mockSetState],
  }));

  const initProvider = () => {
    return (
      <MockedProvider mocks={categoryData} addTypename={false}>
        <Header category={""} setCategories={mockSetState} />
      </MockedProvider>
    );
  };

  it("renders components without errors", async () => {
    render(initProvider());
  });

  it("renders <Header /> components", async () => {
    render(initProvider());

    await waitFor(() => {
      //   Expect <Header /> to be rendered by checking data-testid
      expect(screen.getByTestId("header-container")).not.toBeNull();
    });
  });

  it("renders <DropDown /> and <select /> components", async () => {
    render(initProvider());

    await waitFor(() => {
      //  expect <Header /> to be rendered by checking data-testid
      expect(screen.getByTestId("header-container")).not.toBeNull();
    });

    await waitFor(() => {
      //  expect <Dropdown /> to be rendered
      expect(screen.getByTestId("dropdown")).not.toBeNull();
      // screen.debug();
    });

    await waitFor(() => {
      // expect <select /> to be rendered
      expect(screen.getByTestId("dropdown-selection")).not.toBeNull();
    });

    const selection = screen.getByTestId("dropdown-selection");
    // default option + selectable option count
    expect(selection).toHaveLength(
      1 + categoryData[0].result.data.categories.length
    );
  });

  it("renders <ListView /> correctly with callback upon user select option", async () => {
    render(initProvider());

    const dropdown = await screen.findByTestId("dropdown-selection");
    userEvent.selectOptions(dropdown, screen.getByTestId("select-option-1"));
    const selectValue = categoryData[0].result.data.categories[1].title;
    userEvent.selectOptions(dropdown, selectValue);

    await waitFor(() => {
      expect(mockSetState).toHaveBeenLastCalledWith(selectValue);
    });
  });
});
