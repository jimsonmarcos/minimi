import { Company, LazyTableState } from "@/types/common";
import { Column } from "primereact/column";
import { DataTable, DataTableSelectAllChangeEvent } from "primereact/datatable";

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

export default function CompaniesTable({
  companies,
  lazyState,
  totalRecords,
  onPage,
  loading,
  selectedCompanies,
  onSelectionChange,
  selectAll,
  onSelectAllChange,
}: DataTableType) {
  return (
    <div data-testid="datatable" className="card">
      {/* @ts-expect-error fix overload error */}
      <DataTable
        value={companies}
        lazy
        filterDisplay="row"
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={10}
        totalRecords={totalRecords}
        onPage={onPage}
        loading={loading}
        selection={selectedCompanies}
        onSelectionChange={onSelectionChange}
        selectAll={selectAll}
        onSelectAllChange={onSelectAllChange}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
      </DataTable>
    </div>
  );
}
