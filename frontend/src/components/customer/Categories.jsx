import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Organic Food",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
  },
  {
    id: 2,
    name: "Gardening",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500",
  },
  {
    id: 3,
    name: "Solar Energy",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500",
  },
  {
    id: 4,
    name: "Eco Home",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500",
  },
];

function Categories() {
  return (
    <section className="section">
      <div className="container">

        <h2 className="text-center fw-bold text-success mb-5">
          Shop By Category
        </h2>

        <div className="row">

          {categories.map((category) => (

            <div className="col-lg-3 col-md-6 mb-4" key={category.id}>

              <div className="category-card">

                <img
                  src={category.image}
                  alt={category.name}
                />

                <div className="p-3">

                  <h5>{category.name}</h5>

                  <Link
                    to="/products"
                    className="btn btn-green mt-2"
                  >
                    Explore
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;