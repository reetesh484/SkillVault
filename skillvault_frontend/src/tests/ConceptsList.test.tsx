import { render, screen, waitFor, within } from "@testing-library/react";
import { renderWithClient } from "./test-utils";
import { ConceptsList } from "@/components/ConceptsList";
import userEvent from "@testing-library/user-event";
import { mockDeleteConcept, mockGetConcepts } from "./api/handler";
import { server } from "./api/server";
import { MainLayout } from "@/layout/MainLayout";
import { AppRoutes } from "@/routes/AppRoutes";

test("loads and displays concepts", async () => {
  const mockConcepts = [
    {
      id: 1,
      title: "Test Concept",
      notes: "Some notes",
      created_at: "2024-01-01",
    },
  ];
  //rendering the list
  renderWithClient(<ConceptsList concepts={mockConcepts} />);

  // The title must appear
  expect(screen.getByText("Test Concept")).toBeInTheDocument();

  // Notes should appear if they are rendered by your component
  expect(screen.getByText("Some notes")).toBeInTheDocument();
});

test("delete concept", async () => {
  const user = userEvent.setup();

  server.use(mockDeleteConcept);

  renderWithClient(
    <MainLayout>
      <AppRoutes />
    </MainLayout>,
    { route: "/" }
  );

  expect(await screen.findByText("Test Concept")).toBeInTheDocument();
  expect(await screen.findByText("React for Beginners")).toBeInTheDocument();

  await user.click(screen.getByLabelText("Delete Test Concept"));

  await waitFor(() => {
    expect(screen.queryByText("Test Concept")).not.toBeInTheDocument();
  });

  expect(screen.getByText("React for Beginners")).toBeInTheDocument();
});
