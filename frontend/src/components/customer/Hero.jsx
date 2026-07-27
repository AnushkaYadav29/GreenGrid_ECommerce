import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6">

            <span className="badge bg-success px-3 py-2 mb-3">
              🌱 Eco-Friendly Shopping
            </span>

            <h1 className="hero-title">
              Shop Smart.
              <br />
              Live Green.
            </h1>

            <p className="hero-text">
              Discover sustainable products that help protect the planet.
              GreenGrid brings eco-friendly brands together in one place.
            </p>

            <div className="mt-4">

              <Link to="/products" className="btn btn-green me-3">
                Shop Now
              </Link>

              <Link
                to="/categories"
                className="btn btn-outline-success"
              >
                Explore Categories
              </Link>

            </div>

            <div className="row mt-5">

              <div className="col-4">
                <h3 className="fw-bold text-success">10K+</h3>
                <small>Customers</small>
              </div>

              <div className="col-4">
                <h3 className="fw-bold text-success">500+</h3>
                <small>Products</small>
              </div>

              <div className="col-4">
                <h3 className="fw-bold text-success">98%</h3>
                <small>Eco Score</small>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
              className="hero-image"
              alt="Green Shopping"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;