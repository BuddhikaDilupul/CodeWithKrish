import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema for create invemtory item
const inventorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too Short!")
    .max(50, "Name is too Long!")
    .required("Item Name is Required"),

  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is Required")
    .typeError("Price must be a valid number"),

  quantity: Yup.number()
    .integer("Quantity must be a whole number")
    .positive("Quantity must be a positive number")
    .required("Quantity is Required")
    .typeError("Quantity must be a valid number"),
});
interface Props {
  create: Function;
  isSuccess: boolean;
}
const Create = (props: Props) => {
  console.log(props);
  const handleSubmit = (data: any, setSubmitting: any, resetForm: any) => {
    console.log(data);
    props.create(data);

    if (props.isSuccess || false) {
      setSubmitting(false);
      resetForm();
    }
  };
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <Formik
        initialValues={{
          name: "",
          price: "",
          quantity: "",
        }}
        validationSchema={inventorySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // // Convert price and quantity to numbers
          // const processedValues = {
          //   ...values,
          //   price: parseFloat(values.price),
          //   quantity: parseInt(values.quantity),
          // };
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <h5 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Add Inventory Item
            </h5>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Item Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`bg-gray-50 border ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                  placeholder="Enter item name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <Field
                  type="number"
                  name="price"
                  step="0.01"
                  className={`bg-gray-50 border ${
                    touched.price && errors.price
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                  placeholder="Enter price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <Field
                type="number"
                name="quantity"
                className={`bg-gray-50 border ${
                  touched.quantity && errors.quantity
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                placeholder="Enter quantity"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 disabled:opacity-50"
            >
              {isSubmitting ? "Adding Item..." : "Add Inventory Item"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
