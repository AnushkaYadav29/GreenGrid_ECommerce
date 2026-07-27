import {
  FaLeaf,
  FaTruck,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf />,
    title: "Eco-Friendly Products",
    description:
      "Carefully selected sustainable products that help protect our planet.",
  },
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping to your doorstep across India.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payments",
    description:
      "Safe online payments with Razorpay and Cash on Delivery.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you with your orders.",
  },
];

function WhyChooseUs() {
  return (
    <section className="section why-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold text-success">
            Why Choose GreenGrid?
          </h2>

          <p className="text-muted">
            Sustainable shopping made simple, secure and reliable.
          </p>

        </div>

        <div className="row">

          {features.map((feature, index) => (

            <div className="col-lg-3 col-md-6 mb-4" key={index}>

              <div className="feature-card text-center">

                <div className="feature-icon">

                  {feature.icon}

                </div>

                <h4 className="mt-4">

                  {feature.title}

                </h4>

                <p>

                  {feature.description}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;