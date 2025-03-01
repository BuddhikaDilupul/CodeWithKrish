import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Prop interface for view customer
interface Props {
  customers: {
    name: string;
    address: string;
    email: string;
  }[];
}
export default function View(props: Props) {

  return (
    <div className="card">
      <DataTable
        value={props?.customers}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="Id" style={{ width: "5%" }}></Column>
        <Column field="name" header="Name" style={{ width: "25%" }}></Column>
        <Column field="email" header="Email" style={{ width: "25%" }}></Column>
        <Column
          field="address"
          header="Address"
          style={{ width: "45%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
