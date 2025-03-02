// Service file for all customer related APIs

import Notiflix from "notiflix";
import api from "./api";

const port = "http://localhost:3002";
const base = "/orders";
const baseUrl = port + base;

// API call for save Order
export const createOrder = async (path: string, data: any) => {
  try {
    const res = await api.post(baseUrl + path, data);
    Notiflix.Notify.success(res.data?.message || "Order Created Successfully");
    return res;
  } catch (error: any) {
    console.error(error);
    if (error) {
      error?.response?.data?.message?.map((msg: string) => {
        Notiflix.Notify.failure(
          msg || "Error fetching data. Please try again later."
        );
      });
    }
  }
};

// API call for update Status
export const updateOrderStatus = async (path: string, data: any) => {
  try {
    const res = await api.patch(baseUrl + path, data);
    Notiflix.Notify.success(res.data?.message || "Order Status Updated Successfully");
    return res;
  } catch (error: any) {
    console.error(error);
    if (error) {
      error?.response?.data?.message?.map((msg: string) => {
        Notiflix.Notify.failure(
          msg || "Error fetching data. Please try again later."
        );
      });
    }
  }
};

// API call for fetch Order
export const fetchOrder = async (path: string) => {
  try {
    const res = await api.get(baseUrl + path);
    return res;
  } catch (error: any) {
    console.error(error)
    if (error) {
      error?.response?.data?.message?.map((msg: string) => {
        console.log("first")
        Notiflix.Notify.failure(
          msg || "Error fetching data. Please try again later."
        );
      });
    }
  }
};
