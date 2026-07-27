import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLeaf } from "react-icons/fa";
import { forgotPassword } from "../api/authApi";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      toast.success(res.data.message);

      setEmail("");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Unable to send reset email"
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

              <h1>Password Recovery</h1>

              <p>
                Enter your email to receive a password reset link.
              </p>

            </div>

          </div>

          <div className="col-lg-6 bg-white p-5">

            <h2 className="text-success fw-bold mb-4">

              Forgot Password

            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-4">

                <label>Email Address</label>

                <div className="input-group">

                  <span className="input-group-text">

                    <FaEnvelope/>

                  </span>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />

                </div>

              </div>

              <button
                className="btn btn-green w-100"
                disabled={loading}
              >

                {loading
                  ? "Sending..."
                  : "Send Reset Link"}

              </button>

            </form>

            <div className="text-center mt-4">

              <Link to="/login">

                Back to Login

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ForgotPassword;