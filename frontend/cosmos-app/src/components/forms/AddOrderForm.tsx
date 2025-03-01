import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const AddOrderForm = () => {
  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default AddOrderForm;

// import { useState } from "react";
// import axios from "axios";
// import { create_order } from "../../services/order-service";

// const AddOrderForm = () => {

//   const [customerId, setCustomerId] = useState()
//   const [productId, setProductId] = useState()
//   const [price, setPrice] = useState()
//   const [quantity, setQuantity] = useState()
//   const handleSubmit = async(e: any) => {
//     e.preventDefault();
//     const data = {
//       customerId: customerId,
//       items:[{
//         productId: productId,
//         price: price,
//         quantity: quantity,
//       }]};
//     const res = await create_order(data);
//     console.log(res);

//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="customerId">Customer ID</label>
//         <input type="text" id="customerId" name="customerId" onChange={(e: any)=>{setCustomerId(e.target.value)}} required/>
//         <br />

//         <label htmlFor="productId">product Id</label>
//         <input type="text" id="productId" name="productId" onChange={(e: any)=>{setProductId(e.target.value)}} required/>
//         <br />

//         <label htmlFor="price">Price</label>
//         <input type="text" id="price" name="price" onChange={(e: any)=>{setPrice(e.target.value)}} required/>
//         <br />

//         <label htmlFor="quantity">Quantity</label>
//         <input type="text" id="quantity" name="quantity" onChange={(e: any)=>{setQuantity(e.target.value)}} required/>
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddOrderForm;
