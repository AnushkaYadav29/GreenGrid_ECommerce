import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Organic Apples",
    price: 199,
    oldPrice: 249,
    rating: 4.8,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600",
  },
  {
    id: 2,
    name: "Eco Water Bottle",
    price: 499,
    oldPrice: 699,
    rating: 4.7,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
  },
  {
    id: 3,
    name: "Indoor Plant",
    price: 599,
    oldPrice: 799,
    rating: 4.9,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
  },
  {
    id: 4,
    name: "Reusable Shopping Bag",
    price: 299,
    oldPrice: 399,
    rating: 4.6,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
  },
];

function FeaturedProducts() {
  return (
    <section className="section bg-light">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold text-success">
            Featured Products
          </h2>

          <p className="text-muted">
            Discover our most loved eco-friendly products.
          </p>

        </div>

        <div className="row">

          {products.map((product) => (

            <div className="col-lg-3 col-md-6 mb-4" key={product.id}>

              <div className="product-card">

                <div className="position-relative">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="badge bg-success badge-product">
                    {product.badge}
                  </span>

                  <button className="wishlist-btn">
                    <FaHeart />
                  </button>

                </div>

                <div className="p-3">

                  <h5>{product.name}</h5>

                  <div className="rating">

                    <FaStar className="text-warning" />

                    <span className="ms-2">
                      {product.rating}
                    </span>

                  </div>

                  <div className="my-3">

                    <span className="fw-bold fs-5 text-success">
                      ₹{product.price}
                    </span>

                    <span className="text-muted text-decoration-line-through ms-2">
                      ₹{product.oldPrice}
                    </span>

                  </div>

                  <button className="btn btn-green w-100">

                    <FaShoppingCart className="me-2"/>

                    Add To Cart

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;