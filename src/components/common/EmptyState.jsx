import PropTypes from 'prop-types';

/**
 * Empty state component for when no data is available
 */
const EmptyState = ({ 
  title = 'No data found',
  description = '',
  icon = '📭',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-md">{description}</p>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
};

export default EmptyState;
