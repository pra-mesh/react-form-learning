import { Route, Routes } from "react-router";
import ReactHookForm from "./pages/ReactHookForm";
import FormikForm from "./pages/FormikForm";
import RHFWithZod from "./pages/RHFwithZod";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<ReactHookForm />} />
        <Route path="formik" element={<FormikForm />} />
        <Route path="RHFZod" element={<RHFWithZod />} />
      </Routes>
    </>
  );
};

export default App;
