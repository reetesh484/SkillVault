import { ConceptsList } from "@/components/ConceptsList";
import { EmptyState } from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteConcepts } from "@/hooks/useInfiniteConcepts";
import { useDeleteConcept } from "@/hooks/useDeleteConcept";
import { toast } from "sonner";
import FilterChips from "@/components/FilterChips";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const debouncedValue = useDebounce(searchInput, 400);
  const selectedTags = useMemo(() => {
    const tags = searchParams.get("tags")?.split(",") || [];
    return tags;
  }, [searchParams]);

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useInfiniteConcepts(debouncedValue, selectedTags);
  const concepts = data?.pages.flatMap((page) => page.results) || [];

  const toggleTags = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag != tag)
      : [...selectedTags, tag];

    const params: Record<string, string> = {};
    if (next.length > 0) params.tags = next.join(",");

    setSearchParams(params, { replace: true });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const deleteConcept = useDeleteConcept();
  const handleDelete = (id: number) => {
    deleteConcept.mutate(id, {
      onError: () => {
        toast.error("Delete failed");
      },
      onSuccess: () => {
        toast.success("Concept deleted");
      },
    });
  };

  const isInitialEmpty =
    !isLoading && !error && debouncedValue === "" && concepts.length === 0;

  const isSearchEmpty =
    !isLoading && !error && debouncedValue !== "" && concepts.length === 0;

  const shouldShowList = !isLoading && !error && concepts.length > 0;

  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedValue) params.q = debouncedValue;
    if (selectedTags.length > 0) params.tags = selectedTags.join(",");

    setSearchParams(params, { replace: true });
  }, [debouncedValue, selectedTags]);

  //   useEffect(() => {
  //     const node = loadMoreRef.current;
  //     if (!node) return;

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
  //           fetchNextPage();
  //         }
  //       },
  //       {
  //         root: null,
  //         rootMargin: "100px",
  //         threshold: 0,
  //       }
  //     );

  //     observer.observe(node);
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p className="text-red-500">Failed to load concepts.</p>;

  if (isInitialEmpty)
    return <EmptyState onAddClick={() => navigate("/add-concept")} />;

  return (
    <>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search concepts..."
          value={searchInput}
          onChange={onSearchChange}
          className="w-full pr-9"
        />
        {debouncedValue && (
          <Button
            type="button"
            aria-label="Clear search"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => setSearchInput("")}
          >
            x
          </Button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <FilterChips selectedTags={selectedTags} toggleTags={toggleTags} />
      )}

      {shouldShowList && (
        <ConceptsList
          concepts={concepts}
          onDelete={handleDelete}
          hasNextPage={hasNextPage}
          isFetching={isFetchingNextPage}
          onLoadMore={fetchNextPage}
          toggleTags={toggleTags}
        />
      )}

      {isSearchEmpty && (
        <EmptyState
          title="No concepts found"
          message="Try adjusting your search."
          onAddClick={() => navigate("/add-concept")}
        />
      )}

      <div ref={loadMoreRef} />

      {/* {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )} */}
    </>
  );
}
