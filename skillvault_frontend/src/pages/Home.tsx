import { ConceptsList } from "@/components/ConceptsList";
import { EmptyState } from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useConcepts } from "@/hooks/useConcepts";
import { PaginationControls } from "@/components/PaginationControls";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteConcept } from "@/hooks/useDeleteConcept";
import { toast } from "sonner";
import FilterChips from "@/components/FilterChips";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("q") || "";
  const [page, setPage] = useState(initialPage);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(initialSearch);
  const debouncedValue = useDebounce(searchInput, 400);
  const { data, isLoading, error } = useConcepts(page, debouncedValue);

  const concepts = data?.results || [];
  const hasNext = Boolean(data?.next);
  const hasPrev = Boolean(data?.previous);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };
  const selectedTags = useMemo(() => {
    const tags = searchParams.get("tags")?.split(",") || [];
    return tags;
  }, [searchParams]);

  const toggleTags = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag != tag)
      : [...selectedTags, tag];

    const params: Record<string, string> = {};
    if (next.length > 0) params.tags = next.join(",");

    setSearchParams(params, { replace: true });
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

  const shouldShowPagination = data?.count && data.count > 10;

  const shouldShowList = !isLoading && !error && concepts.length > 0;

  useEffect(() => {
    const params: Record<string, string> = {};
    if (page > 1) params.page = String(page);
    if (debouncedValue) params.q = debouncedValue;

    setSearchParams(params, { replace: true });
  }, [page, debouncedValue, setSearchParams]);

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p className="text-red-500">Failed to load concepts.</p>;

  if (isInitialEmpty)
    return <EmptyState onAddClick={() => navigate("/add-concept")} />;

  return (
    <>
      <Input
        type="text"
        placeholder="Search concepts..."
        value={searchInput}
        onChange={onSearchChange}
        className="mb-4 w-full"
      />

      <FilterChips selectedTags={selectedTags} toggleTags={toggleTags} />

      {shouldShowList && (
        <ConceptsList concepts={concepts} onDelete={handleDelete} />
      )}

      {isSearchEmpty && (
        <EmptyState
          title="No concepts found"
          message="Try adjusting your search."
          onAddClick={() => navigate("/add-concept")}
        />
      )}

      {shouldShowPagination && (
        <PaginationControls
          page={page}
          totalPages={data?.count ? Math.ceil(data.count / 10) : 1}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNext={() => {
            if (hasNext) {
              setPage((prev) => prev + 1);
            }
          }}
          onPrev={() => {
            if (hasPrev) {
              setPage((prev) => prev - 1);
            }
          }}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
