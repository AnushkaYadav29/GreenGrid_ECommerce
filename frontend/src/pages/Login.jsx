import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      login(res.data.user, res.data.token);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
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

              <FaLeaf className="display-1 text-white mb-4"/>

              <h1>Welcome Back!</h1>

              <p>
                Continue your sustainable shopping journey
                with GreenGrid.
              </p>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-6 bg-white p-5">

            <h2 className="fw-bold text-success mb-4">

              Login

            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3 position-relative">

                <label>Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  {showPassword ? <FaEyeSlash/> : <FaEye/>}

                </span>

              </div>

              <div className="d-flex justify-content-between mb-4">

                <div>

                  <input type="checkbox"/>

                  <span className="ms-2">
                    Remember Me
                  </span>

                </div>

                <Link to="/forgot-password">

                  Forgot Password?

                </Link>

              </div>

              <button
                className="btn btn-green w-100"
                disabled={loading}
              >

                {loading ? "Logging in..." : "Login"}

              </button>

            </form>

            <div className="text-center mt-4">

              Don't have an account?

              <Link
                className="ms-2"
                to="/register"
              >

                Register

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;