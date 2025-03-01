import React, { useEffect, useState } from "react";
import { get_order } from "../../services/order-service";

const ViewOrders = () => {
  interface Order {
    id: number;
    customerId: number;
    items: {
      productId: number;
      price: number;
      quantity: number;
    }[];
  }

  const [orders, setOrders] = useState<Order[]>([]);

  const handleData = async () => {
    const data = await get_order();
    setOrders(data?.data);
  };
  useEffect(() => {
    handleData();
  }, []);
return (
    <div>
        <h1>View Orders</h1>
        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Order ID</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Customer ID</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Product ID</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {orders?.map((order) => (
                    <React.Fragment key={order.id}>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{order?.id}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{order?.customerId}</td>
                            <td colSpan={3}></td>
                        </tr>
                        {order?.items?.map((item) => (
                            <tr key={item.productId}>
                                <td></td>
                                <td></td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.productId}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.price}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.quantity}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default ViewOrders;
