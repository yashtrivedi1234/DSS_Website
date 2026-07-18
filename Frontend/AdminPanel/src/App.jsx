import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import BlogDashboard from "./pages/blog/BlogDashboard";
import GalleryDashboard from "./pages/gallery/GalleryDashboard";
import ProductDashboard from "./pages/product/ProductDashboard";
import TeamDashboard from "./pages/team/TeamDashboard";
import InquiryDashboard from "./pages/inquiry/InquiryDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "./pages/blog/BlogForm";
import ProductForm from "./pages/product/ProductFrom";
import GalleryForm from "./pages/gallery/GalleryForm";
import TeamForm from "./pages/team/TeamForm";
import VisitorDashboard from "./pages/visitor/VisitorDashboard";
import SubscriberDashboard from "./pages/subscribers/SubscriberDashboard";
import JobDashboard from "./pages/job/JobDahboard";
import AnnouncementForm from "./pages/subscribers/AnnouncementForm";
import ClientTable from "./pages/client/clienttable";
import ClientForm from "./pages/client/clientForm";
import OffersDashboard from "./pages/offers/OfferForm";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<BlogDashboard />} />
          <Route path="/blog/add" element={<BlogForm />} />
          <Route path="/blog/update/:id" element={<BlogForm />} />
          <Route path="/gallery" element={<GalleryDashboard />} />
          <Route path="/gallery/add" element={<GalleryForm />} />
          <Route path="/gallery/update/:id" element={<GalleryForm />} />
          <Route path="/product" element={<ProductDashboard />} />
          <Route path="/product/add" element={<ProductForm />} />
          <Route path="/product/update/:id" element={<ProductForm />} />
          <Route path="/team" element={<TeamDashboard />} />
          <Route path="/team/add" element={<TeamForm />} />
          <Route path="/team/update/:id" element={<TeamForm />} />
          <Route path="/offers" element={<OffersDashboard />} />
          <Route path="/inquiry" element={<InquiryDashboard />} />
          <Route path="/visitor" element={<VisitorDashboard />} />
          <Route path="/subscriber" element={<SubscriberDashboard />} />
          <Route
            path="/subscriber/announcement"
            element={<AnnouncementForm />}
          />
          <Route path="/job-application" element={<JobDashboard />} />
          {/* Client Routes */}
          <Route path="/admin/client" element={<ClientTable />} />
          <Route path="/clienttable" element={<ClientTable />} />
          <Route path="/clienttable/add" element={<ClientForm />} />
          <Route path="/clienttable/update/:id" element={<ClientForm />} />
          <Route path="/admin/client/create" element={<ClientForm />} />
          <Route path="/admin/client/:id/edit" element={<ClientForm />} />
          <Route path="/client" element={<ClientTable />} />
          <Route path="/client/add" element={<ClientForm />} />
          <Route path="/client/update/:id" element={<ClientForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
