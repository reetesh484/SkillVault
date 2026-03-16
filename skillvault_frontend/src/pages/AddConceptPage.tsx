import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { api } from "@/api";
import { fetchConceptById } from "@/api/concepts";
import type { Concept } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function AddConceptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const initialized = useRef(false);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<{ title?: string; notes?: string }>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const debouncedValue = useDebounce(
    JSON.stringify({ title, notes, tags }),
    300,
  );

  const { data: concept, isLoading: isFetching } = useQuery<Concept>({
    queryKey: ["concepts", id],
    queryFn: () => fetchConceptById(id!),
    enabled: isEdit,
  });

  useEffect(() => {
    if (!isEdit) return;

    if (!initialized.current || !concept) return;

    const debouncedValueParsed = JSON.parse(debouncedValue);

    if (
      !debouncedValueParsed.notes.trim() ||
      !debouncedValueParsed.title.trim()
    )
      return;

    const { title, notes, tags } = debouncedValueParsed;
    const tagNames = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (
      title === concept.title &&
      notes === concept.notes &&
      tagNames.join(",") === concept.tags.map((t) => t.name).join(",")
    ) {
      return;
    }

    const payload = {
      title,
      notes,
      tag_names: tagNames,
    };

    if (concept) {
      updateMutation.mutate(payload);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!initialized.current && isEdit && concept) {
      setTitle(concept.title);
      setNotes(concept.notes);
      setTags(concept.tags.map((t) => t.name).join(", "));
      initialized.current = true;
    }
  }, [isEdit, concept]);

  const addMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      notes: string;
      tag_names?: string[];
    }) => api.post("/concepts/", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concepts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      notes: string;
      tag_names?: string[];
    }) => api.patch(`/concepts/${id}/`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concepts"] });
    },
  });
  console.log(updateMutation.status);

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/concepts/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concepts"] });
      navigate("/", { replace: true });
    },
  });

  const validate = () => {
    const newErrors: { title?: string; notes?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!notes.trim()) newErrors.notes = "Notes are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tagNames = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { title, notes, tag_names: tagNames };

    if (isEdit) {
      await toast.promise(updateMutation.mutateAsync(payload), {
        loading: "Updating concept...",
        success: () => {
          navigate("/", { replace: true });
          return "Concept updated!";
        },
        error: "Failed to update concept",
      });
    } else {
      await toast.promise(addMutation.mutateAsync(payload), {
        loading: "Saving concept...",
        success: () => {
          setTitle("");
          setNotes("");
          setTags("");
          return "Concept saved!";
        },
        error: "Failed to save concept",
      });
    }
  };

  const handleDelete = async () => {
    await toast.promise(deleteMutation.mutateAsync(), {
      loading: "Deleting...",
      success: "Concept deleted",
      error: "Failed to delete concept",
    });
  };

  const isSubmitting = addMutation.isPending || updateMutation.isPending;

  if (isEdit && isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {isEdit ? "Edit Concept" : "New Concept"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isEdit && (
            <span className="text-sm italic ">
              {updateMutation.isPending && "Saving..."}
              {updateMutation.isSuccess && "Saved"}
              {updateMutation.isError && "Failed to save"}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          {isEdit &&
            (confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sure?</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Yes, delete"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmDelete(false)}
                >
                  No
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setConfirmDelete(true)}
                className="gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            ))}

          <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </header>

      {/* Fields + Editor */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 overflow-hidden"
      >
        {/* Title & Tags row */}
        <div className="flex gap-4 px-4 py-3 shrink-0">
          <div className="flex-1 space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Concept title"
              className={
                errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, typescript, hooks"
            />
            <p className="text-xs text-muted-foreground">Comma-separated</p>
          </div>
        </div>

        {/* Split Editor */}
        <div className="flex flex-1 overflow-hidden border border-gray-200 dark:border-gray-800 mx-4 mb-4 rounded-lg">
          {/* Left: Markdown input */}
          <div className="flex flex-col w-1/2 border-r border-gray-200 dark:border-gray-800">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900">
              Markdown
            </div>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes in markdown..."
              className={`flex-1 rounded-none border-0 resize-none focus-visible:ring-0 font-mono text-sm h-full ${
                errors.notes ? "border-red-500" : ""
              }`}
            />
            {errors.notes && (
              <p className="px-3 pb-2 text-xs text-red-500">{errors.notes}</p>
            )}
          </div>

          {/* Right: Preview */}
          <div className="flex flex-col w-1/2">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900">
              Preview
            </div>
            <div className="flex-1 overflow-y-auto p-4 prose prose-sm dark:prose-invert max-w-none">
              {notes ? (
                <Markdown>{notes}</Markdown>
              ) : (
                <p className="text-muted-foreground italic text-sm">
                  Preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
