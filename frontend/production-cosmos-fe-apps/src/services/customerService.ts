// Service file for all customer related APIs

import Notiflix from "notiflix";
import api from "./api";

const port = "http://localhost:3000";
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
    console.error(error)
    if (error) {
      error?.response?.data?.message?.map((msg: string) => {
        Notiflix.Notify.failure(
          msg || "Error fetching data. Please try again later."
        );
      });
    }
  }
};

// API call for fetch customers
export const fetchCustomers = async (path: string) => {
  try {
    const res = await api.get(baseUrl + path);
    return res;
  } catch (error: any) {
     console.error(error)
     if (error) {
       error?.response?.data?.message?.map((msg: string) => {
         Notiflix.Notify.failure(
           msg || "Error fetching data. Please try again later."
         );
       });
     }
  }
};
