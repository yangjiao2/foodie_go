import Rating from "./Rating";

/**
 * Renders a business card element.
 * @param {Object} data - The business information.
 * @param {string} filterOption - The value to sort the business types.
 * @return {!React.ReactElement}
 */

const Card = ({ data, filterCategory }) => {
  const { name, location, photos, price, rating, categories } = data || {};
  const image = photos.length > 0 ? photos[0] : null;
  const address = [
    location.city,
    location.state,
  ].join(", ");

  return (
    < div className="business-card" data-testid="card">
      <div className="business-details">
        <div className="business-image">
          {image ? (
            <img src={image} alt="business" />
          ) : (
            <label className="no-image">No Image</label>
          )}
        </div>
        <div className="business-description">
          <h3 className="business-name">{name}</h3>
          <p className="business-address">{address}</p>

          <div className="business-specs">
            <div className="business-types">
              {categories.map((type, index) => (
                <span
                  key={index}
                  className={`${type.title === filterCategory ? "selected" : ""}`}
                >
                  {`${type.title}${categories.length - 1 !== index ? ", " : ""}`}
                </span>
              ))}
            </div>
            <Rating numOfStars={rating} />
            <p>
              Price: {price}
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Card;
