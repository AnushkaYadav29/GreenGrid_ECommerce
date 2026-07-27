import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success("Registration Successful");

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      <div className="container">

        <div className="row shadow-lg rounded-4 overflow-hidden">

          {/* Left */}

          <div className="col-lg-6 login-left d-none d-lg-flex">

            <div>

              <FaLeaf className="display-1 text-white mb-4" />

              <h1>Join GreenGrid</h1>

              <p>
                Create your account and start shopping sustainably.
              </p>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-6 bg-white p-5">

            <h2 className="fw-bold text-success mb-4">
              Register
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label>Name</label>

                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Phone</label>

                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3 position-relative">

                <label>Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <div className="mb-4 position-relative">

                <label>Confirm Password</label>

                <input
                  type={showConfirm ? "text" : "password"}
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <span
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <button
                className="btn btn-green w-100"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

            </form>

            <div className="text-center mt-4">

              Already have an account?

              <Link className="ms-2" to="/login">
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Register;