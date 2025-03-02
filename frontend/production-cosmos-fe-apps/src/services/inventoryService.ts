// Service file for all customer related APIs

import Notiflix from "notiflix";
import api from "./api";

const port = "http://localhost:3003";
const base = "/inventory";
const baseUrl = port + base;

// API call for save Inventory
export const createInventory = async (path: string, data: any) => {
  try {
    const res = await api.post(baseUrl + path, data);
    Notiflix.Notify.success(
      res.data?.message || "Inventory Created Successfully"
    )
    return res;
  } catch (error: any) {
    console.error(error);
  }
};

// API call for fetch Inventory
export const fetchInventory = async (path: string) => {
  try {
    const res = await api.get(baseUrl + path);
    return res;
  } catch (error: any) {
    if (error) {
      Notiflix.Notify.failure(error.message || "Error fetching data. Please try again later.");
    }
  }
};
