export type Company = {
  id: number;
  name: string;
};

export type LazyTableState = {
  first: number;
  rows: number;
  page: number;
  sortField?: string;
  sortOrder?: number;
  filters: DataTableFilterMeta;
};
