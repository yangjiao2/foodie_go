import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import businessData from "../../testData/business";
import { NO_RESULT } from "../utils/constants";
import "@testing-library/jest-dom";
import ListView from "../pages/ListView";

describe("Test <ListView/> component", () => {
  const initListView = () => (
    <ListView
      dataSource={businessData[0].result.data.business}
      filterCategory={""}
    ></ListView>
  );
  it("renders components without errors", async () => {
    render(initListView());
  });

  it("should render no result if data source is empty list", async () => {
    render(<ListView dataSource={[]} filterCategory={""}></ListView>);

    expect(await screen.findByText(NO_RESULT)).toBeInTheDocument();
  });

  it("renders <Card /> components", async () => {
    const { queryByLabelText, getByLabelText } = render(initListView());
    await waitFor(() => {
      //   Expect <Card /> component to be rendered by checking data-testid
      expect(screen.getByTestId("card")).not.toBeNull();
    });
  });

  it("renders <Card /> correctly with provided mock dataset", async () => {
    render(initListView());
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
