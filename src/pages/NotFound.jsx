import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="page section center-page">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for may have moved.</p>
      <Link className="gold-button" to="/shop">
        Browse Gifts
      </Link>
    </section>
  );
}