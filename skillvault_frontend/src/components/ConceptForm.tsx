import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "../api";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { fetchConceptById } from "@/api/concepts";
import type { Concept } from "@/types";

export const AddConceptForm = () => {
  const [title, setTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: string; notes?: string }>({
    title: "",
    notes: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const initialized = useRef(false);
  const { data: concept } = useQuery<Concept>({
    queryKey: ["concepts", id],
    queryFn: () => fetchConceptById(id!),
    enabled: isEdit,
  });

  useEffect(() => {
    if (!initialized.current && isEdit && concept) {
      setTitle(concept.title);
      setNotes(concept.notes);
      setTags(concept.tags.map((tag) => tag.name).join(", ") || "");
      initialized.current = true;
    }
  }, [isEdit, concept]);
  const queryClient = useQueryClient();

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

    setIsSubmitting(true);
    const tagNames = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (isEdit) {
        await toast.promise(
          updateMutation.mutateAsync({ title, notes, tag_names: tagNames }),
          {
            loading: "Updating...",
            success: "Concept updated!",
            error: "Failed to update concept",
          }
        );
      } else {
        await toast.promise(
          addMutation.mutateAsync({ title, notes, tag_names: tagNames }),
          {
            loading: "Adding...",
            success: "Concept added!",
            error: "Failed to add concept",
          }
        );
      }

      setTitle("");
      setNotes("");
      setTags("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 p-6 rounded-lg border 
      bg-white dark:bg-neutral-900 
      border-gray-200 dark:border-gray-800 
      shadow-sm transition-colors"
      >
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter concept title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            className={
              errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
            }
          />
          {errors.title && (
            <p id="title-error" className="test-sm text-red-500" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">
            Notes
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write notes..."
            aria-invalid={!!errors.notes}
            aria-describedby={errors.notes ? "notes-error" : undefined}
            className={`min-h-[120px] ${
              errors.notes ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
          {errors.notes && (
            <p id="notes-error" className="test-sm text-red-500" role="alert">
              {errors.notes}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-gray-700 dark:text-gray-300">
            Tags
          </Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react,typescript,javascript"
          />
          <p className="text-xs text-muted-foreground">Comma-separated tags</p>
        </div>

        <Button disabled={isSubmitting} type="submit">
          {isEdit
            ? isSubmitting
              ? "Updating..."
              : "Update Concept"
            : isSubmitting
            ? "Adding..."
            : "Add Concept"}
        </Button>
      </form>
    </>
  );
};
