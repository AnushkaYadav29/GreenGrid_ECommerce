import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Verified Customer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    review:
      "GreenGrid has become my favorite place to shop for eco-friendly products. The quality is amazing and delivery is always on time.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Verified Customer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    review:
      "I ordered reusable kitchen products and they exceeded my expectations. Highly recommended!",
  },
  {
    id: 3,
    name: "Priya Patil",
    role: "Verified Customer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    review:
      "Excellent customer support, beautiful products, and a mission I truly support. Love GreenGrid!",
  },
];

function Testimonials() {
  return (
    <section className="section bg-light">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold text-success">
            What Our Customers Say
          </h2>

          <p className="text-muted">
            Thousands of happy customers trust GreenGrid.
          </p>

        </div>

        <div className="row">

          {testimonials.map((item) => (

            <div className="col-lg-4 mb-4" key={item.id}>

              <div className="testimonial-card">

                <img
                  src={item.image}
                  alt={item.name}
                  className="testimonial-img"
                />

                <h5>{item.name}</h5>

                <small className="text-success">
                  {item.role}
                </small>

                <div className="my-3">

                  {[...Array(item.rating)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-warning me-1"
                    />
                  ))}

                </div>

                <p>
                  "{item.review}"
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;