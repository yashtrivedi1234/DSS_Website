import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrandStory from "./pages/about/BrandStory";
import DirectorMessage from "./pages/about/DirectorMessage";
import VisionMission from "./pages/about/VisionMission";
import TeamPage from "./pages/about/TeamPage";
import ProjectPage from "./pages/ProjectPage";
import ClientPage from "./pages/ClientPage";
import TestimonialPage from "./pages/TestimonialPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import CareerPage from "./pages/CareerPage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicy from "./pages/PrivacyPage";
import CookiePolicy from "./cookie/CookiePolicy";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetail1";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ServicePage from "./pages/ServiceDetailPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import GlobalCursors from "./components/GlobalCursors";
import ProjectDetail from "./pages/ProjectDetail";
import ScrollProgressBar from "./components/ScrollProgressBar";
import TextToSpeechPlayer from "./components/TextToSpeechPlayer";
import Chatbot from "./components/Chatbot";
import BrandCollaboration from "./pages/BrandCollaboration";
import ReferralAffiliate from "./pages/ReferralAffiliate";
import FranchiseApplication from "./pages/FranchiseApplication";
import BranchPage from "./components/BranchPage";

function AppRoutes() {
  return (
    <>
      <ScrollProgressBar />
      <TextToSpeechPlayer text="Welcome to our website" autoPlay={false} />
      <GlobalCursors />
      <Chatbot />
      <Header />
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* About */}
        <Route path="/about/story" element={<BrandStory />} />
        <Route path="/about/director-message" element={<DirectorMessage />} />
        <Route path="/about/vision&mission" element={<VisionMission />} />
        <Route path="/about/team" element={<TeamPage />} />
        {/* Products */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        {/* Main Pages */}
        <Route path="/projects" element={<ProjectPage />} />
        {/* Gallery Route */}
        {/* Project Detail Route - Add this NEW route */}
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-detail/:slug" element={<BlogDetail />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        {/* Policies */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/brand-collaboration" element={<BrandCollaboration />} />
        <Route path="/referral-affiliate" element={<ReferralAffiliate />} />
        <Route
          path="/franchise-application"
          element={<FranchiseApplication />}
        />
        <Route path="/branches/:slug" element={<BranchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
