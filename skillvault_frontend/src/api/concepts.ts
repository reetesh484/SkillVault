import { api } from "@/api";
import type { PaginatedResponse, Concept } from "@/types";

export const getConcepts = async (
  page = 1,
  q?: string,
  selectedTags?: string[]
): Promise<PaginatedResponse<Concept>> => {
  const res = await api.get("/concepts/", {
    params: {
      page,
      q,
      tags: selectedTags?.length ? selectedTags.join(",") : undefined,
    },
  });
  return res.data;
};

export const fetchConceptById = async (id: string): Promise<Concept> => {
  const res = await api.get<Concept>(`/concepts/${id}/`);
  return res.data;
};
