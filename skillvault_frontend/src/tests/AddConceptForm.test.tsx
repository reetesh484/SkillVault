import { renderWithClient } from "./test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppRoutes } from "../routes/AppRoutes";
import { MainLayout } from "../layout/MainLayout";
import { mockCreateConcept, mockGetConcepts } from "./api/handler";
import { server } from "./api/server";

test("user can submit Add Concept form and see new concept on home page", async () => {
  const user = userEvent.setup();

  // Use POST mock
  server.use(mockCreateConcept);

  // Initial page = /add-concept
  renderWithClient(
    <MainLayout>
      <AppRoutes />
    </MainLayout>,
    { route: "/add-concept" }
  );

  // Fill form
  await user.type(screen.getByLabelText(/title/i), "New Concept");
  await user.type(screen.getByLabelText(/notes/i), "New Notes");

  // Submit form
  await user.click(screen.getByRole("button", { name: /add concept/i }));

  // After POST success, use new GET mock
  server.use(mockGetConcepts);

  //navigate back to home page
  await user.click(screen.getByRole("link", { name: /home/i }));

  // Wait for redirect to home & new data rendered
  expect(await screen.findByText("New Concept")).toBeInTheDocument();
});
