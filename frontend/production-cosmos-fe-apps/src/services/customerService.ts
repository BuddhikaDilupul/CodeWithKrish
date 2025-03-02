// Service file for all customer related APIs

import Notiflix from "notiflix";
import api from "./api";

const port = "http://localhost:3001";
const base = "/customer";
const baseUrl = port + base;

// API call for save customers
export const createCustomer = async (path: string, data: any) => {
  try {
    const res = await api.post(baseUrl + path, data);
     Notiflix.Notify.success(
          res.data?.message || "Customer Saved Successfully"
        )
    return res;
  } catch (error: any) {
    if (error) {
      Notiflix.Notify.failure("Error fetching data. Please try again later.");
    }
    console.error(error);
  }
};

// API call for fetch customers
export const fetchCustomers = async (path: string) => {
  try {
    const res = await api.get(baseUrl + path);
    return res;
  } catch (error: any) {
    if (error) {
      Notiflix.Notify.failure(
        error.message || "Error fetching data. Please try again later."
      );
    }
    console.error(error);
  }
};
