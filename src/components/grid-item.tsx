import { Company } from "@/types/common";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";

type DataTableType = {
  company: Company;
  selectedCompanies: Company[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectionChange: any;
};

export default function CompaniesGridItem({
  company,
  selectedCompanies,
  onSelectionChange,
}: DataTableType) {
  console.log(selectedCompanies);

  return (
    <div
      className="card hover:cursor-pointer"
      onClick={() => {
        if (selectedCompanies?.find((c) => company.id === c.id)) {
          return onSelectionChange({
            value: selectedCompanies.filter((c) => c.id !== company.id),
          });
        }

        return onSelectionChange({
          value: [...(selectedCompanies || []), company],
        });
      }}
    >
      <Card title={company.name}>
        <div>
          <div className="flex align-items-center">
            <Checkbox
              inputId=""
              name="pizza"
              value="Cheese"
              checked={
                selectedCompanies?.find((c) => company.id === c.id) !==
                undefined
              }
            />
            <label htmlFor="" className="ml-2">
              Select
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
}
