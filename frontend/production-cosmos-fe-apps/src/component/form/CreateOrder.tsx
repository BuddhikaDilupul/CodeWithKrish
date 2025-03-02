import { Formik, Form, Field, ErrorMessage } from "formik";
import Notiflix from "notiflix";
import { useState } from "react";
import * as Yup from "yup";
import { formatCurrency } from "../../utils/curruncyConvertor";

// Validation Schema
const createSchema = Yup.object().shape({
  customerId: Yup.string().required("Customer is Required"),
});
interface Props {
  create: Function;
  customers:
    | [
        {
          id: number;
          name: string;
        }
      ]
    | [];
  products: [
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }
  ];
}
interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

const Create = (props: Props) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [currentProduct, setCurrentProduct] = useState<string | number>("");
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const handleSubmit = (data: any, setSubmitting: any, resetForm: any) => {
    console.log(data);
    console.log(orderItems);
    const transformedData ={
        customerId: parseInt(data.customerId),
        items: orderItems?.map((data)=>{
            return {
                productId: data.productId,
                quantity: data.quantity,
                price: parseFloat(data.price.toString())
            }
        })   
    }
    console.log(transformedData,"trans");
    
    props.create(transformedData);
    setSubmitting(false);
    resetForm();
  };

  const handleAddProduct = () => {
    if (!currentProduct) return;

    const selectedProduct = props.products.find(
      (p) => p.id.toString() === currentProduct.toString()
    );

    for (const data of orderItems) {
      if (data.productId.toString() === currentProduct.toString()) {
        Notiflix.Notify.warning(
          ` ${selectedProduct?.name} already exists in items list`
        );
        return;
      }
    }
    if (!selectedProduct || currentQuantity > selectedProduct.quantity) {
      return;
    }

    const newItem: OrderItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: currentQuantity,
      price: selectedProduct.price,
      total: selectedProduct.price * currentQuantity,
    };

    setOrderItems([...orderItems, newItem]);

    //Clean ups
    setCurrentProduct("");
    setCurrentQuantity(1);
  };

  // Calculate total item price
  const calculateTotalOrder = () => {
    return orderItems.reduce((total, item) => total + item.total, 0);
  };
  const handleRemoveItem = (index: number) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };
  console.log(orderItems);

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <Formik
        initialValues={{
          customerId: "",
        }}
        validationSchema={createSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <h5 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Make a Order
            </h5>

            <div className="grid grid-cols-2 gap-4">
              <div className=" w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Customer <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="customerId"
                  className={`bg-gray-50 border ${
                    touched.customerId && errors.customerId
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                >
                  <option value="">Select a Customer</option>
                  {props.customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="customerId"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <>
              {/* Product Selection */}
              <div className="flex space-x-2 mt-4">
                <select
                  value={currentProduct}
                  onChange={(e) => setCurrentProduct(e.target.value)}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="">Select Product</option>
                  {props.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={currentQuantity}
                  onChange={(e) => setCurrentQuantity(Number(e.target.value))}
                  min="1"
                  className="w-1/4 p-2 border rounded"
                  placeholder="Qty"
                />

                <input
                  type="number"
                  disabled
                  value={
                    props.products.find(
                      (p) => p.id.toString() === currentProduct.toString()
                    )?.quantity
                  }
                  className="w-1/4 p-2 border rounded"
                  placeholder="Qty"
                />

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="w-1/4 bg-blue-500 text-white p-2 rounded"
                >
                  Add
                </button>
              </div>
            </>
            <>
              {/* Order Items Table */}
              {orderItems.length > 0 && (
                <div className="mt-4">
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Product</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="border p-2">{item.productName}</td>
                          <td className="border p-2">{item.quantity}</td>
                          <td className="border p-2">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="border p-2">
                            {formatCurrency(item.total)}
                          </td>
                          <td className="border p-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="border p-2 font-bold">
                          Total
                        </td>
                        <td colSpan={2} className="border p-2">
                          {formatCurrency(calculateTotalOrder())}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 disabled:opacity-50"
            >
              {isSubmitting ? "Placing Order..." : "Confirm Order"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
