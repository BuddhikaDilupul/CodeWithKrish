// Service file for all customer related APIs

import api from "./api";

const port = "http://localhost:3001";
const base = "/customer";
const baseUrl = port + base;

// API call for save customers
export const createCustomer = async (path: string, data: any) => {
  try {
    return await api.post(baseUrl + path, data);
  } catch (error: any) {
    console.error(error);
  }
};

// API call for fetch customers
export const fetchCustomers = async (path: string) => {
  try {
    return await api.get(baseUrl + path);
  } catch (error: any) {
    console.error(error);
  }
};
