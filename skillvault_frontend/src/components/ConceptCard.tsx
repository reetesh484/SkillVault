import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dummyTags = [
  { id: 1, name: "React" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "CSS" },
];

export function ConceptCard({
  title,
  notes,
  tags = dummyTags,
  onTagClick,
  onDelete,
  onEdit,
  deleting = false,
}: {
  title: string;
  notes: string;
  tags?: { id: number; name: string }[];
  onTagClick?: (tag: string) => void;
  onDelete: () => void;
  onEdit: () => void;
  deleting?: boolean;
}) {
  return (
    <Card
      className={cn(
        "shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 transition-colors",
        "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {notes}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick?.(tag.name)}
              className="rounded-full bg-muted px-3 py-1 text-xs hover:bg-accent cursor-pointer"
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={deleting}
          aria-label={`Delete ${title}`}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
