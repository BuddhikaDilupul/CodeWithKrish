import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import moment from "moment";
import { IoEye } from "react-icons/io5";
import { Dropdown } from "primereact/dropdown";
import Modal from "../modal/Modal";
import { status, statusOptions } from "../../utils/serverity";
import Notiflix from "notiflix";
import { formatCurrency } from "../../utils/curruncyConvertor";

// Prop interface for view customer
interface Props {
  orders: {
    orderId: string;
    customerName: string;
    address: string;
    email: string;
    status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    orderCreatedAt: string;
    items: {
      productId: string;
      quantity: number;
      productName: string;
      price: string;
    }[];
  }[];
  stockUpdate: Function;
}

export default function View(props: Props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState<any[]>([]);

  // status option selection in tble
  const statusBodyTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-2">
        {/* <Tag value={rowData.status} /> */}
        <Dropdown
          options={statusOptions}
          disabled={rowData.status ==  status.CANCELLED || rowData.status == status.DELIVERED}
          value={rowData.status}
          onChange={(e) => handleStatusChange(rowData.orderId, e.value)}
          placeholder="Update Status"
          className="w-full md:w-14rem"
        />
      </div>
    );
  };

  // Handle status change with confirmation
  const handleStatusChange = (orderId: string, newStatus: string) => {
    Notiflix.Confirm.show(
      "Confirm Status Change",
      "Are you sure you want to change the status of this order?",
      "Yes",
      "No",
      () => {
        // Update the status in the table
        props.stockUpdate(orderId, { status: newStatus });
      },
      () => {}
    );
  };

  // date format 'YY-MM-DD HH:mm:ss'
  const dayBodyTemplate = (props: any) => {
    return moment(props.orderCreatedAt).format("YY-MM-DD HH:mm:ss");
  };

  // Action types to display on column
  const actionBodyTemplate = (rowData: any) => {
    function rowColumnClick(rowData: any): void {
      // Set items to show in modal
      setSelectedOrderItems(rowData.items);
      setVisibleModal(true);
    }

    return (
      <span className="flex items-center gap-2">
        <IoEye
          className="cursor-pointer"
          onClick={() => rowColumnClick(rowData)}
        />
      </span>
    );
  };
 const priceBodyTemplate = (rowData: any) => {
    return formatCurrency(rowData.price);
  };
  
  // Items modal columns
  const itemsColumns = [
    { field: "id", header: "Product ID" },
    { field: "productName", header: "Product Name" },
    { field: "quantity", header: "Quantity" },
    { header: "Price", body: priceBodyTemplate },
  ];

  return (
    <div className="card">

      {/* Main Orders DataTable */}
      <DataTable
        value={props.orders}
        paginator
        rows={10}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="orderId" header="OrderId"></Column>
        <Column field="customerName" header="Customer Name"></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
        <Column header="Date" body={dayBodyTemplate}></Column>
        <Column header="Action" body={actionBodyTemplate}></Column>
      </DataTable>

      {/* Order items modal */}
      <Modal
        visible={visibleModal}
        setVisible={setVisibleModal}
        label="Order Items"
      >
        <DataTable value={selectedOrderItems}>
          {itemsColumns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} body={col.body}/>
          ))}
        </DataTable>
      </Modal>
    </div>
  );
}
