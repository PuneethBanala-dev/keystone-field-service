import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WorkOrders from "./pages/WorkOrders";
import WorkOrderDetail from "./pages/WorkOrderDetail";
import CreateWorkOrder from "./pages/CreateWorkOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work-orders" element={<WorkOrders />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
        <Route path="/work-orders/new" element={<CreateWorkOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;