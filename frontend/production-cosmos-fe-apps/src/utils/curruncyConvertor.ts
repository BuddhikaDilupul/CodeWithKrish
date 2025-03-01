export const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("en-Si", {
      style: "currency",
      currency: "LKR",
    });
  };