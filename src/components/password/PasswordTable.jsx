import PropTypes from 'prop-types';
import PasswordRow from './PasswordRow';
import { EmptyState } from '../common';
import { TABLE_HEADERS } from '../../constants';

/**
 * Password table component displaying all saved passwords
 */
const PasswordTable = ({ passwords, onCopy, onEdit, onDelete }) => {
  if (passwords.length === 0) {
    return (
      <EmptyState
        title="No passwords saved yet"
        description="Add your first password using the form above. Your passwords are stored locally in your browser."
        icon="🔐"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table View */}
      <table className="hidden sm:table w-full rounded-xl overflow-hidden shadow-lg shadow-green-200/50">
        <thead className="bg-green-700 text-white">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header} className="py-3 px-4 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {passwords.map((item) => (
            <PasswordRow
              key={item.id}
              item={item}
              onCopy={onCopy}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {passwords.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg shadow-green-200/50 p-4 space-y-3"
          >
            {/* Site */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Site</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onCopy(item.site)}
              >
                <a
                  href={item.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline truncate max-w-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.site}
                </a>
                <img src="/icons/copy.png" alt="Copy" className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Username</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onCopy(item.username)}
              >
                <span className="truncate max-w-50">{item.username}</span>
                <img src="/icons/copy.png" alt="Copy" className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Password</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onCopy(item.password)}
              >
                <span className="truncate max-w-50">••••••••</span>
                <img src="/icons/copy.png" alt="Copy" className="w-4 h-4 opacity-50" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-green-100">
              <button
                onClick={() => onEdit(item.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
              >
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PasswordTable.propTypes = {
  passwords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      site: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCopy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PasswordTable;
