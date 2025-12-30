import { Badge } from "./ui/badge";

const FilterChips = ({
  toggleTags,
  selectedTags,
}: {
  toggleTags: (tag: string) => void;
  selectedTags: string[];
}) => {
  return (
    <div className="my-2 flex gap-2">
      Active Filters :{" "}
      {selectedTags?.map((tags) => (
        <Badge
          variant="default"
          role="button"
          aria-label={`Remove filter ${tags}`}
          key={tags}
          className="cursor-pointer"
        >
          {tags} <span onClick={() => toggleTags(tags)}>x</span>
        </Badge>
      ))}
    </div>
  );
};

export default FilterChips;
