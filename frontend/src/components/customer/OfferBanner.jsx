import { Link } from "react-router-dom";

function OfferBanner() {
  return (
    <section className="offer-section">

      <div className="container">

        <div className="offer-banner">

          <div className="row align-items-center">

            {/* Left Side */}

            <div className="col-lg-6">

              <span className="offer-badge">
                🌿 Limited Time Offer
              </span>

              <h2 className="offer-title">
                Save Up To
                <span className="text-warning"> 50% </span>
                On Eco-Friendly Products
              </h2>

              <p className="offer-text">
                Discover premium sustainable products at unbeatable prices.
                Build a greener future while saving more.
              </p>

              <Link to="/products" className="btn btn-light btn-lg mt-3">
                Shop Now →
              </Link>

            </div>

            {/* Right Side */}

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900"
                alt="Eco Offer"
                className="offer-image"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default OfferBanner;