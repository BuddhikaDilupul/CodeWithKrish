import { useEffect, useState } from "react";

import Modal from "../component/modal/Modal";
// import { createOrder, fetchOrder } from "../services/inventoryService";
import View from "../component/views/ViewOrder";


const Order = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [inventory, setOrder] = useState<any[]>([]);

  // Function to make new inventory item via triggering api
  const create = async (data: any) => {
    // const response = await createOrder("/", data);
    // if (response?.data) {
    //   setVisible(false);
    //   setOrder((inventory: any[]) => [...inventory, response.data]);
    // }
  };

  // Function to trigger get data inventory api
  const getOrder = async () => {
    // const response = await fetchOrder("/all");
    // if (response) {
    //   setOrder(response.data);
    // }
  };

  // Calling inventory function when page is loading
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
      <h2 className=" text-2xl font-extrabold text-gray-900 text-center mb-6">
        Orders management
      </h2>

      <div className=" mb-4">
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 disabled:opacity-50"
          onClick={() => setVisible(true)}
        >
          Add Order
        </button>
      </div>

      {/* View inventory item component */}
      <View orders={inventory} />

      {/* Show create new item form */}
      {/* <Modal visible={visible} setVisible={setVisible} label="Add Order">
        <Create create={create} />
      </Modal> */}
    </div>
  );
};

export default Order;
