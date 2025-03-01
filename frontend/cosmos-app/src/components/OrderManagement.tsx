import AddOrderForm from "./forms/AddOrderForm"
import ViewOrders from "./views/ViewOrders"

const OrderManagement = () => {
  return (
    <div>
        <h1>Order Management</h1>
        <AddOrderForm/>
        <br />
        <br />
        <ViewOrders/>
        {/* <CreateOrder */}
    </div>
  )
}

export default OrderManagement