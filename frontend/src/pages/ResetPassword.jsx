import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";
import { resetPassword } from "../api/authApi";
import toast from "react-hot-toast";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      return toast.error("Passwords do not match");

    }

    try {

      setLoading(true);

      const res = await resetPassword(token, password);

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="login-page">

      <div className="container">

        <div className="row shadow-lg rounded-4 overflow-hidden">

          <div className="col-lg-6 login-left d-none d-lg-flex">

            <div>

              <FaLeaf className="display-1 text-white mb-4"/>

              <h1>Create New Password</h1>

              <p>

                Enter your new password to continue shopping securely.

              </p>

            </div>

          </div>

          <div className="col-lg-6 bg-white p-5">

            <h2 className="fw-bold text-success mb-4">

              Reset Password

            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-4 position-relative">

                <label>New Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
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

              <div className="mb-4 position-relative">

                <label>Confirm Password</label>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  required
                />

                <span
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >

                  {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}

                </span>

              </div>

              <button
                className="btn btn-green w-100"
                disabled={loading}
              >

                {loading
                  ? "Updating..."
                  : "Reset Password"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>

  );

}

export default ResetPassword;