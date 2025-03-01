import { useEffect, useState } from "react";

import Modal from "../component/modal/Modal";
import { createInventory, fetchInventory } from "../services/inventoryService";
import View from "../component/views/ViewInventory";
import Create from "../component/form/CreateInventoryItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Inventory = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [inventory, setInventory] = useState<any[]>([]);
  const queryClient = useQueryClient();
 
  // Mutation used to create and invalidate existing fetched data
  const inventoryMutation = useMutation({
    mutationFn: ({ path, data }: { path: string; data: any }) =>
      createInventory(path, data),
    onSuccess: () => {
      // Invalidate existing data
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });

  // Fetching data using useQuery hook with mutation
  const create = async (data: any) => {
    inventoryMutation.mutate({ path: "/", data });
  };

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
    if (inventoryQuery?.data) {
      setInventory(inventoryQuery?.data?.data);
    }
  }, [inventoryQuery.data]);

  return (
    <div>
      <h2 className=" text-2xl font-extrabold text-gray-900 text-center mb-6">
        Inventory management
      </h2>

      <div className=" mb-4">
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 disabled:opacity-50"
          onClick={() => setVisible(true)}
        >
          Add Inventory
        </button>
      </div>

      {/* View inventory item component */}
      <View inventory={inventory} />

      {/* Show create new item form */}
      <Modal visible={visible} setVisible={setVisible} label="Add Inventory">
        <Create create={create} isSuccess={inventoryQuery.isSuccess || false} />
      </Modal>
    </div>
  );
};

export default Inventory;
