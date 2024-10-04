import { Company, LazyTableState } from "@/types/common";
import { DataTableSelectAllChangeEvent } from "primereact/datatable";
import CompaniesGridItem from "./grid-item";
import { Paginator } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";

type DataTableType = {
  companies: Company[] | null;
  lazyState: LazyTableState;
  totalRecords: number;
  onPage: (event: LazyTableState) => void;
  loading: boolean;
  selectedCompanies: Company[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectionChange: any;
  selectAll: boolean;
  onSelectAllChange: (event: DataTableSelectAllChangeEvent) => void | undefined;
};

export default function CompaniesGrid({
  companies,
  lazyState,
  totalRecords,
  onPage,
  loading,
  selectedCompanies,
  onSelectionChange,
}: DataTableType) {
  return (
    <div id="datagrid" className="relative">
      <div className="grid grid-cols-2 gap-5">
        {companies?.map((company, i) => (
          <CompaniesGridItem
            company={company}
            selectedCompanies={selectedCompanies}
            onSelectionChange={onSelectionChange}
            key={i}
          />
        ))}
      </div>

      <div className="mt-5">
        <Paginator
          first={lazyState.first}
          rows={lazyState.rows}
          totalRecords={totalRecords}
          onPageChange={async (e) =>
            await onPage({
              ...lazyState,
              first: e.first,
              page: e.page,
              rows: e.rows,
            })
          }
        />
      </div>

      {loading && (
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
}
