import type { Concept } from "@/types";
import { http, HttpResponse } from "msw";

let data = [
  {
    id: 1,
    title: "Test Concept",
    notes: "A deep dive into TypeScript and its features.",
  },
  {
    id: 2,
    title: "React for Beginners",
    notes:
      "Learn the basics of React and how to build single-page applications.",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    notes: "Explore advanced JavaScript concepts and techniques.",
  },
];

export const mockGetConcepts = http.get("*/api/concepts/", () => {
  return HttpResponse.json(data, {
    status: 200,
  });
});

export const mockCreateConcept = http.post(
  "*/api/concepts/",
  async ({ request }) => {
    const body = (await request.json()) as Omit<Concept, "id">;
    const newConcept = { id: Date.now(), ...body };
    data.push(newConcept);
    return HttpResponse.json(
      {
        id: 99,
        title: body.title,
        notes: body.notes,
      },
      { status: 201 }
    );
  }
);

export const mockDeleteConcept = http.delete(
  "*/api/concepts/:id",
  async ({ params }) => {
    data = data.filter((concept) => concept.id !== Number(params.id));
    return new HttpResponse({
      status: 204,
    });
  }
);

export const handlers = [mockGetConcepts, mockCreateConcept, mockDeleteConcept];
