import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
// import Register from "../pages/Register"; // Uncomment after creating Register.jsx

import Hero from "../components/customer/Hero";
import Categories from "../components/customer/Categories";
import FeaturedProducts from "../components/customer/FeaturedProducts";
import WhyChooseUs from "../components/customer/WhyChooseUs";
import OfferBanner from "../components/customer/OfferBanner";
import Testimonials from "../components/customer/Testimonials";
import Newsletter from "../components/customer/Newsletter";
import Footer from "../components/customer/Footer";

function Home() {
  return (
    <div className="container py-5">
      <h1 className="title">
        Welcome to GreenGrid 🌿
      </h1>

      <p className="subtitle">
        Sustainable Shopping Starts Here.
      </p>

      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <OfferBanner />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password"element={<ForgotPassword/>}/>

        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        {/* Uncomment after creating Register page */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;