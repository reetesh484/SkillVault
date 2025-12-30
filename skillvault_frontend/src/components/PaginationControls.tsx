import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit?: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PaginationControls = (props: PaginationControlsProps) => {
  const limit = props.limit || 5;
  const middle = Math.floor(limit / 2);

  const start = Math.max(1, props.page - middle);
  const end = Math.min(props.totalPages, start + limit - 1);

  const adjustedStart = Math.max(1, end - limit + 1);

  const paginationWindow: number[] = Array.from(
    { length: end - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  );

  return (
    <>
      <div className="flex justify-center justify-items-center  gap-4 mt-4">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={props.onPrev}
          disabled={!props.hasPrev}
        >
          Previous
        </Button>
        <span className="flex  gap-2">
          {paginationWindow[0] > 1 && <span className="align-middle">...</span>}
          {paginationWindow.map((window) => (
            <button
              className={`pt-1 pb-1 pr-2 pl-2 border cursor-pointer rounded-lg ${
                window === props.page
                  ? "font-bold border-black dark:border-white"
                  : ""
              }`}
              key={`${window}`}
              onClick={() => props.onPageChange(window)}
            >
              {`${window}`}
            </button>
          ))}
          {(paginationWindow.at(-1) ?? 0) < props.totalPages && (
            <span className="items-center">...</span>
          )}
        </span>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={props.onNext}
          disabled={!props.hasNext}
        >
          Next
        </Button>
      </div>
    </>
  );
};
