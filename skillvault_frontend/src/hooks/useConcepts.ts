import { useQuery } from "@tanstack/react-query";
import { getConcepts } from "@/api/concepts";

export function useConcepts(page: number, q?: string) {
  return useQuery({
    queryKey: ["concepts", page, q],
    queryFn: () => getConcepts(page, q),
    placeholderData: (prev) => prev,
  });
}
