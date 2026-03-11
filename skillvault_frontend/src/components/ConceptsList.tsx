import type { Concept } from "../types";
import { ConceptCard } from "./ConceptCard";
import { useNavigate } from "react-router-dom";

interface Props {
  concepts: Concept[];
  hasNextPage?: boolean;
  isFetching?: boolean;
  onLoadMore?: () => void;
  onDelete?: (id: number) => void;
  toggleTags?: (tag: string) => void;
}

export function ConceptsList({ concepts, toggleTags, onDelete }: Props) {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    const editUrl = `/concepts/${id}/edit`;

    navigate(editUrl, { replace: true });
  };

  // const ITEM_HEIGHT = 205;

  // const Row = ({ index, style }: RowComponentProps) => {
  //   const concept: any = concepts[index];

  //   return (
  //     <div style={style} className="pb-4">
  //       <ConceptCard
  //         {...concept}
  //         onDelete={() => onDelete?.(concept.id)}
  //         onEdit={() => handleEdit(concept.id)}
  //         onTagClick={toggleTags}
  //       />
  //     </div>
  //   );
  // };

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {concepts.map((c: Concept) => (
        <ConceptCard
          key={c.id}
          title={c.title}
          notes={c.notes}
          onDelete={() => onDelete?.(c.id)}
          onEdit={() => handleEdit(c.id)}
          onTagClick={toggleTags}
        />
      ))}
    </div>
    //infinite scroll list
    // <List
    //   rowComponent={Row}
    //   rowCount={concepts.length}
    //   rowHeight={ITEM_HEIGHT}
    //   rowProps={{}}
    //   style={{ maxHeight: "100vh" }}
    //   onScroll={(e) => {
    //     const target = e.currentTarget;

    //     const distanceFromBottom =
    //       target.scrollHeight - (target.scrollTop + target.clientHeight);

    //     if (
    //       distanceFromBottom < ITEM_HEIGHT * 3 &&
    //       hasNextPage &&
    //       onLoadMore &&
    //       !isFetching
    //     ) {
    //       onLoadMore(); // fetchNextPage from parent
    //     }
    //   }}
    // />
  );
}
