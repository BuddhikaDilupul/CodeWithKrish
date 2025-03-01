import { useEffect, useState } from "react";
import Create from "../component/form/CreateCustomer";
import View from "../component/views/ViewCustomers";
import Modal from "../component/modal/Modal";
import { createCustomer, fetchCustomers } from "../services/customerService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Customer = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const queryClient = useQueryClient();

  // Mutation used to create and invalidate existing fetched data
  const customerMutation = useMutation({
    mutationFn: ({ path, data }: { path: string; data: any }) => createCustomer(path, data),
    onSuccess: () => {
      // Invalidate existing data
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
  
  // Fetching data using useQuery hook with mutation
  const create = async (data: any) => {
    customerMutation.mutate({ path: "/", data });
  };

  // React query for api caching and fetching data. added 60*60*1000 stale time (cache)
  const customerQuery = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return await fetchCustomers("/all");
    },
    staleTime: 60 * 60 * 1000,
  });

  // Fetching data from query and set to state
  useEffect(() => {
    if (customerQuery?.data) {
      setCustomers(customerQuery?.data?.data);
    }
  }, [customerQuery.data]);

  return (
    <div>
      <h2 className=" text-2xl font-extrabold text-gray-900 text-center mb-6">
        Customer management
      </h2>
      <div className=" mb-4">
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 disabled:opacity-50"
          onClick={() => setVisible(true)}
        >
          Add Customer
        </button>
      </div>

      {/* View component for Customer Data */}
      <View customers={customers} />

      {/* Inside a popup will display create form for customers */}
      <Modal visible={visible} setVisible={setVisible} label="Add Customer">
        <Create create={create} />
      </Modal>
    </div>
  );
};

export default Customer;
