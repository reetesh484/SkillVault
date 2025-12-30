import type { Concept } from "../types";
import { ConceptCard } from "./ConceptCard";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";
import { useNavigate } from "react-router-dom";

interface Props {
  concepts: Concept[];
  hasNextPage?: boolean;
  isFetching?: boolean;
  onLoadMore?: () => void;
  onDelete?: (id: number) => void;
  toggleTags?: (tag: string) => void;
}

export function ConceptsList({
  concepts,
  hasNextPage,
  isFetching,
  onLoadMore,
  toggleTags,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    const editUrl = `/concepts/${id}/edit`;

    navigate(editUrl, { replace: true });
  };

  const ITEM_HEIGHT = 195;

  const Row = ({ index, style }: RowComponentProps) => {
    const concept: any = concepts[index];

    return (
      <div style={style} className="pb-4">
        <ConceptCard
          {...concept}
          onDelete={() => onDelete?.(concept.id)}
          onEdit={() => handleEdit(concept.id)}
          onTagClick={toggleTags}
        />
      </div>
    );
  };

  return (
    // <div className="grid gap-4">
    //   {concepts.map((c: Concept) => (
    //     <ConceptCard
    //       key={c.id}
    //       title={c.title}
    //       notes={c.notes}
    //       onDelete={() => handleDelete(c.id)}
    //     />
    //   ))}
    // </div>
    <List
      rowComponent={Row}
      rowCount={concepts.length}
      rowHeight={ITEM_HEIGHT}
      rowProps={{}}
      style={{ maxHeight: "100vh", overflow: "auto" }}
      onScroll={(e) => {
        const target = e.currentTarget;

        const distanceFromBottom =
          target.scrollHeight - (target.scrollTop + target.clientHeight);

        if (
          distanceFromBottom < ITEM_HEIGHT * 3 &&
          hasNextPage &&
          onLoadMore &&
          !isFetching
        ) {
          onLoadMore(); // fetchNextPage from parent
        }
      }}
    />
  );
}
