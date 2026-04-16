import PropTypes from 'prop-types';
import { LORD_ICONS } from '../../constants';

/**
 * Single password row component for the table
 */
const PasswordRow = ({ item, onCopy, onEdit, onDelete }) => {
  const CopyableCell = ({ text, isLink = false }) => (
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={() => onCopy(text)}
    >
      {isLink ? (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 truncate text-green-700 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {text}
        </a>
      ) : (
        <span className="flex-1 truncate">{text}</span>
      )}
      <img
        src="/icons/copy.png"
        alt="Copy"
        className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
      />
    </div>
  );

  return (
    <tr className="border-b border-green-200 hover:bg-green-50 transition-colors">
      {/* Site */}
      <td className="p-3">
        <CopyableCell text={item.site} isLink />
      </td>

      {/* Username */}
      <td className="p-3">
        <CopyableCell text={item.username} />
      </td>

      {/* Password */}
      <td className="p-3">
        <CopyableCell text={item.password} />
      </td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => onEdit(item.id)}
            className="p-1 hover:bg-green-100 rounded-full transition-colors"
            aria-label="Edit password"
          >
            <lord-icon
              src={LORD_ICONS.EDIT}
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#0a5c15"
              style={{ width: '20px', height: '20px' }}
            />
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Delete password"
          >
            <lord-icon
              src={LORD_ICONS.DELETE}
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#dc2626"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

PasswordRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    site: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onCopy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PasswordRow;
