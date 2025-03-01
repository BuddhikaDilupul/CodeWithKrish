import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrency } from "../../utils/CurruncyConvertor";
interface Props {
  inventory: {
    name: string;
    address: string;
    email: string;
  }[];
}
export default function View(props: Props) {
  // Calling curruncy convertor via below function to display local curruncy in table
  const priceBodyTemplate = (rowData: any) => {
    return formatCurrency(rowData.price);
  };
  return (
    <div className="card">
      <DataTable
        value={props.inventory}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="Id" style={{ width: "25%" }}></Column>
        <Column field="name" header="Name" style={{ width: "25%" }}></Column>
        <Column
          header="Price"
          body={priceBodyTemplate}
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
