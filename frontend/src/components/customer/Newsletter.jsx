import { FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  return (
    <section className="newsletter-section">

      <div className="container">

        <div className="newsletter-box">

          <div className="row align-items-center">

            {/* Left */}

            <div className="col-lg-6">

              <span className="newsletter-tag">
                🌱 Stay Connected
              </span>

              <h2 className="newsletter-title">
                Subscribe to our Newsletter
              </h2>

              <p className="newsletter-text">
                Get exclusive discounts, eco-friendly shopping tips,
                new arrivals and special offers delivered directly
                to your inbox.
              </p>

            </div>

            {/* Right */}

            <div className="col-lg-6">

              <form className="newsletter-form">

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />

                <button className="btn btn-green">

                  <FaPaperPlane className="me-2"/>

                  Subscribe

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;