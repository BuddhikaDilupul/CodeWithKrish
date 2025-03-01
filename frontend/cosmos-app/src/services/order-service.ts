import axios from "axios";
const createOrderUrl = "http://localhost:3000/orders/";
const getOrderUrl = "http://localhost:3000/orders/all";
export const create_order = async (data: any) => {
  try {
    return await axios.post(createOrderUrl, data);
  } catch (error) {
    console.log(error);
  }
};

export const get_order = async () => {
  try {
    return await axios.get(getOrderUrl);
  } catch (error) {
    console.log(error);
  }
};
