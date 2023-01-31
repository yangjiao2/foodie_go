const TOTAL_POSSIBLE_STARS = Array(5).fill();

/**
 * Renders a star rating element.
 * @param {integer} numOfStars - The total number of stars.
 * @return {!React.ReactElement}
 */

const Rating = ({ numOfStars }) => {
  return (
    <div className="rating">
      {TOTAL_POSSIBLE_STARS.map((_, index) =>
        index < numOfStars ? (
          <div key={index} className="star-filled" />
        ) : (
          <div key={index} className="star" />
        )
      )}
    </div>
  );
};

export default Rating;
