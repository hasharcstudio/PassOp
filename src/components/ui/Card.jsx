import PropTypes from 'prop-types';

/**
 * Card component for consistent container styling
 */
const Card = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-white rounded-xl 
      shadow-lg shadow-green-200/50
      p-4 sm:p-6
      ${className}
    `}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
