"use client";

import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { DataTableSelectAllChangeEvent } from "primereact/datatable";
import { Company, LazyTableState } from "@/types/common";
import CompaniesTable from "@/components/table";
import axios from "axios";
import { Message } from "primereact/message";
import CompaniesGrid from "@/components/grid";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiFailedToLoad, setApiFailedToLoad] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[] | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[] | null>(
    null
  );
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: undefined,
    sortOrder: undefined,
    filters: {
      // name: { value: "", matchMode: "contains" },
    },
  });
  const [viewType, setViewType] = useState("table");

  const fetchCompanies = async () => {
    const response = await axios.post<Company[]>("/api/companies", lazyState);

    return response.data ?? [];
  };

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const loadLazyData = () => {
    setLoading(true);

    fetchCompanies()
      .then((data) => {
        setApiFailedToLoad(false);
        setTotalRecords(1000);
        setCompanies(data);
      })
      .catch(() => {
        setApiFailedToLoad(true);
        setTotalRecords(0);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPage = (event: LazyTableState) => {
    setlazyState({ ...event, filters: {} });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectionChange = (event: any) => {
    const value = event.value;

    setSelectedCompanies(value);
    setSelectAll(value.length === totalRecords);
  };

  const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
    const selectAll = event.checked;

    if (selectAll) {
      fetchCompanies().then((data) => {
        setSelectAll(true);
        setSelectedCompanies(data);
      });
    } else {
      setSelectAll(false);
      setSelectedCompanies([]);
    }
  };

  const handleDeleteSelected = () => {
    setCompanies(
      companies?.filter(
        (company) =>
          selectedCompanies?.find((c) => c.id === company.id) === undefined
      ) || null
    );

    setSelectedCompanies(null);
  };

  return (
    <div className="flex justify-center min-h-screen p-10">
      <div className="md:max-w-3xl w-full ">
        <div className="md:flex justify-between">
          <h4 className="font-semibold text-3xl">Companies</h4>

          <div className="flex gap-x-3">
            {selectedCompanies !== null && selectedCompanies.length > 0 && (
              <Button
                label={`Delete Selected ${selectedCompanies.length}`}
                className="button"
                icon="pi pi-trash"
                severity="danger"
                onClick={handleDeleteSelected}
              />
            )}

            <Button
              label="Table"
              className="button"
              icon="pi pi-table"
              severity={viewType === "grid" ? "secondary" : undefined}
              onClick={() => setViewType("table")}
            />
            <Button
              label="Grid"
              className="button"
              icon="pi pi-th-large"
              severity={viewType === "table" ? "secondary" : undefined}
              onClick={() => setViewType("grid")}
            />
          </div>
        </div>

        {apiFailedToLoad && (
          <div className="mt-5">
            <Message severity="error" text="Data failed to load." />
          </div>
        )}

        <div className="mt-5">
          {viewType === "table" && (
            <CompaniesTable
              companies={companies}
              lazyState={lazyState}
              totalRecords={totalRecords}
              onPage={onPage}
              loading={loading}
              selectedCompanies={selectedCompanies}
              onSelectionChange={onSelectionChange}
              selectAll={selectAll}
              onSelectAllChange={onSelectAllChange}
            />
          )}

          {viewType === "grid" && (
            <CompaniesGrid
              companies={companies}
              lazyState={lazyState}
              totalRecords={totalRecords}
              onPage={onPage}
              loading={loading}
              selectedCompanies={selectedCompanies}
              onSelectionChange={onSelectionChange}
              selectAll={selectAll}
              onSelectAllChange={onSelectAllChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
