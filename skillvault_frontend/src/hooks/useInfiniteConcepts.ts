import { useInfiniteQuery } from "@tanstack/react-query";
import { getConcepts } from "@/api/concepts";

export const useInfiniteConcepts = (search: string, selectedTags: string[]) => {
  return useInfiniteQuery({
    queryKey: ["concepts", search, selectedTags.join(",")],
    queryFn: ({ pageParam = 1 }) =>
      getConcepts(pageParam, search, selectedTags),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
