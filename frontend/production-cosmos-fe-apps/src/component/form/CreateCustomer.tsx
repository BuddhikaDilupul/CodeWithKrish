import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema
const createSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too Short!")
    .max(50, "Name is too Long!")
    .required("Name is Required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),

  address: Yup.string()
    .min(5, "Address is too Short!")
    .max(100, "Address is too Long!")
    .required("Address is required"),
});
interface Props{
  create: Function
}
const Create = (props: Props) => {

  const handleSubmit = (data: any, setSubmitting: any, resetForm: any) => {
    props.create(data)
    setSubmitting(false);
    resetForm();
  };
  
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <Formik
        initialValues={{
          name: "",
          email: "",
          address: "",
        }}
        validationSchema={createSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <h5 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Customer Registration
            </h5>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`bg-gray-50 border ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                  placeholder="John Doe"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`bg-gray-50 border ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                  placeholder="john@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full Address
              </label>
              <Field
                type="text"
                name="address"
                className={`bg-gray-50 border ${
                  touched.address && errors.address
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                placeholder="123 Main St, City, Country"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register Customer"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
