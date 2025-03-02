import { useEffect, useState } from "react";

import Modal from "../component/modal/Modal";
// import { createOrder, fetchOrder } from "../services/inventoryService";
import View from "../component/views/ViewOrder";
import Create from "../component/form/CreateOrder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers } from "../services/customerService";
import { fetchInventory } from "../services/inventoryService";
import { createOrder, fetchOrder, updateOrderStatus } from "../services/orderService";

const Order = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [inventory, setOrder] = useState<any[]>([]);
  const queryClient = useQueryClient();

  // Mutation used to create and invalidate existing fetched data
  const orderMutation = useMutation({
    mutationFn: ({ path, data }: { path: string; data: any }) =>
      createOrder(path, data),
    onSuccess: () => {
      // Invalidate existing data
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  // Fetching data using useQuery hook with mutation
  const create = async (data: any) => {
    orderMutation.mutate({ path: "/", data });
  };
  
  //Status update
  // Mutation used to create and invalidate existing fetched data
  const orderStatusMutation = useMutation({
    mutationFn: ({ path, data }: { path: string; data: any }) =>
      updateOrderStatus(path, data),
    onSuccess: () => {
      // Invalidate existing data
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  // Fetching data using useQuery hook with mutation
  const update = async (orderId: string, data: any) => {
    orderStatusMutation.mutate({ path: `/${orderId}/status`, data });
  };

  // React query for api caching and fetching data. added 60*60*1000 stale time (cache)
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await fetchOrder("/all");
    },
    staleTime: 60 * 60 * 1000,
  });

  // React query for api caching and fetching data. added 60*60*1000 stale time (cache)
  const customerQuery = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return await fetchCustomers("/all");
    },
    staleTime: 60 * 60 * 1000,
  });

  // React query for api caching and fetching data. added 60*60*1000 stale time (cache)
  const inventoryQuery = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      return await fetchInventory("/all");
    },
    staleTime: 60 * 60 * 1000,
  });
  
  // Fetching data from query and set to state
  useEffect(() => {
    if (ordersQuery?.data) {
      setOrder(inventoryQuery?.data?.data);
    }
  }, [inventoryQuery.data]);

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
      <View orders={ordersQuery.data?.data || []} stockUpdate={update} />

      {/* Show create new order form */}
      <Modal visible={visible} setVisible={setVisible} label="Add Order">
        <Create
          create={create}
          customers={customerQuery.data?.data || []}
          products={inventoryQuery?.data?.data || []}
        />
      </Modal>
    </div>
  );
};

export default Order;
