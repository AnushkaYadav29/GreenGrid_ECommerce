import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row gy-5">

          {/* Company */}

          <div className="col-lg-4">

            <h2 className="footer-logo">

              <FaLeaf className="me-2"/>

              GreenGrid

            </h2>

            <p className="footer-text">

              GreenGrid is your one-stop destination for sustainable,
              eco-friendly shopping. Together we build a greener future.

            </p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF/>
              </a>

              <a href="#">
                <FaInstagram/>
              </a>

              <a href="#">
                <FaTwitter/>
              </a>

              <a href="#">
                <FaLinkedinIn/>
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2">

            <h5>Quick Links</h5>

            <ul className="footer-links">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/products">Products</Link></li>

              <li><Link to="/categories">Categories</Link></li>

              <li><Link to="/about">About Us</Link></li>

            </ul>

          </div>

          {/* Customer */}

          <div className="col-lg-2">

            <h5>Customer</h5>

            <ul className="footer-links">

              <li><Link to="/cart">Cart</Link></li>

              <li><Link to="/wishlist">Wishlist</Link></li>

              <li><Link to="/orders">Orders</Link></li>

              <li><Link to="/profile">Profile</Link></li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-4">

            <h5>Contact</h5>

            <p>

              <FaMapMarkerAlt className="me-2 text-success"/>

              Karad, Maharashtra, India

            </p>

            <p>

              <FaPhoneAlt className="me-2 text-success"/>

              +91 9876543210

            </p>

            <p>

              <FaEnvelope className="me-2 text-success"/>

              support@greengrid.com

            </p>

          </div>

        </div>

        <hr />

        <div className="footer-bottom">

          <p>

            © {new Date().getFullYear()} GreenGrid. All Rights Reserved.

          </p>

          <div>

            <Link to="/privacy">Privacy Policy</Link>

            <span className="mx-3">|</span>

            <Link to="/terms">Terms</Link>

            <span className="mx-3">|</span>

            <Link to="/refund">Refund Policy</Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;