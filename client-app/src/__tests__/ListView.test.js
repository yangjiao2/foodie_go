import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import businessData from "../../testData/business";
import "@testing-library/jest-dom";
import ListView from "../pages/ListView";
import { MockedProvider } from "@apollo/client/testing";

describe("Test <ListView/> component", () => {
  const initProvider = () => {
    return (
      <MockedProvider mocks={businessData} addTypename={false}>
        <ListView filterCategory={""}></ListView>
      </MockedProvider>
    );
  };

  it("renders components without errors", async () => {
    render(initProvider());
  });

  it("renders <ListView /> components", async () => {
    render(initProvider());
    await waitFor(() => {
      //   Expect <ListView /> to be rendered by checking data-testid
      expect(screen.getByTestId("listview-container")).not.toBeNull();
    });
  });

  it("renders <Card /> components", async () => {
    render(initProvider());
    await waitFor(() => {
      //   Expect <Card /> component to be rendered by checking data-testid
      expect(screen.getByTestId("card")).not.toBeNull();
    });
    const dropdown = await screen.findAllByTestId("card");
    expect(dropdown).toHaveLength(businessData[0].result.data.business.length);
  });

  it("renders <Card /> correctly with provided mock dataset", async () => {
    render(initProvider());
    const mockDataset = businessData[0].result.data.business[0];
    // check <Card /> component renders with correct content
    await waitFor(() => {
      const cardView = screen.getByTestId("card");
      expect(cardView).toHaveTextContent(mockDataset.name);
    });

    // check <img /> component renders
    await waitFor(() => {
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });

    // check location context renders
    await waitFor(() => {
      const location = [
        mockDataset.location.city,
        mockDataset.location.state,
      ].join(", ");
      const businessLoc = screen.getByText(location);
      expect(businessLoc).toBeInTheDocument();
    });

    // check price context renders
    await waitFor(() => {
      const businessPrice = screen.getByText(
        "Price: ".concat(mockDataset.price)
      );
      expect(businessPrice).toBeInTheDocument();
    });
  });
});
