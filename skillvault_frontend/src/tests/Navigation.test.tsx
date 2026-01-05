import { screen } from "@testing-library/react";
import { renderWithClient } from "./test-utils";
import userEvent from "@testing-library/user-event";

import { MainLayout } from "@/layout/MainLayout";
import { AppRoutes } from "@/routes/AppRoutes";
import { server } from "./api/server";
import { mockGetConcepts } from "./api/handler";

test("navigates between home page and add concept page", async () => {
  const user = userEvent.setup();
  server.use(mockGetConcepts);

  renderWithClient(
    <MainLayout>
      <AppRoutes />
    </MainLayout>,
    { route: "/" }
  );

  //home page should render correctly
  expect(await screen.findByText("Test Concept")).toBeInTheDocument();

  //navigate to add concept page
  await user.click(screen.getByRole("link", { name: /add concept/i }));

  // add concept page should render correctly (use heading instead of button/link text)
  expect(
    screen.getByRole("heading", { name: /add a new concept/i })
  ).toBeInTheDocument();

  //navigate back to home page
  await user.click(screen.getByRole("link", { name: /home/i }));

  //home page should render correctly
  expect(screen.getByText("Test Concept")).toBeInTheDocument();
});
