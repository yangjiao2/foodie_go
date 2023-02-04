
/**
 * Renders a star rating component.
 * @param {integer} numOfStars - The total number of stars.
 * @return {!React.ReactElement}
 */

const TOTAL_POSSIBLE_STARS = Array(5).fill();

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
