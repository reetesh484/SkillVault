export interface Concept {
  id: number;
  title: string;
  notes: string;
  created_at: string;
  tags: Tag[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Tag {
  id: number;
  name: string;
}
