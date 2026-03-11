import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
        "shadow-sm border group flex flex-col justify-between  border-gray-200 py-4 dark:border-gray-800 bg-white dark:bg-neutral-900 transition-colors",
        "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
      )}
    >
      <CardHeader className="relative p-4 pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 opacity-0 data-[state=open]:opacity-100 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit} aria-label={`Edit ${title}`}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              disabled={deleting}
              aria-label={`Delete ${title}`}
              onClick={onDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CardTitle className="text-md font-semibold line-clamp-1 pr-8">
          {title}
        </CardTitle>
        <CardDescription>
          <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {notes}
          </p>
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick?.(tag.name)}
              className="rounded-full bg-muted px-2 py-1 text-xs hover:bg-accent cursor-pointer"
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
