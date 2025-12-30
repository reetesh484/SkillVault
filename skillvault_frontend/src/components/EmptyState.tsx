import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onAddClick?: () => void;
  title?: string;
  message?: string;
}

export function EmptyState({
  onAddClick,
  title = "No concepts yet",
  message = "Start by adding your first concept using the button below.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Card className="w-full max-w-md text-center shadow-sm">
        <CardContent className="py-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <PlusCircle className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 mb-6">{message}</p>

          {onAddClick && (
            <Button onClick={onAddClick} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Concept
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
