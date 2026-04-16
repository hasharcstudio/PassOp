import PropTypes from 'prop-types';
import { Input, Button, Card } from '../ui';
import usePasswordVisibility from '../../hooks/usePasswordVisibility';
import { LORD_ICONS } from '../../constants';

/**
 * Password form component for adding/editing passwords
 */
const PasswordForm = ({ form, onChange, onSave, isEditing }) => {
  const { inputType, iconSrc, toggleVisibility } = usePasswordVisibility();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Card className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Site URL Input */}
        <Input
          name="site"
          value={form.site}
          onChange={onChange}
          placeholder="Enter website URL"
          autoComplete="url"
        />

        {/* Username and Password Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Enter username"
            autoComplete="username"
          />

          <Input
            name="password"
            type={inputType}
            value={form.password}
            onChange={onChange}
            placeholder="Enter password"
            autoComplete="current-password"
            rightElement={
              <button
                type="button"
                onClick={toggleVisibility}
                className="p-1 hover:opacity-70 transition-opacity"
                aria-label="Toggle password visibility"
              >
                <img
                  src={iconSrc}
                  alt="Toggle password visibility"
                  className="w-6 h-6"
                />
              </button>
            }
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <Button type="submit">
            <lord-icon
              src={LORD_ICONS.SAVE}
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#000000"
              style={{ width: '24px', height: '24px' }}
            />
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

PasswordForm.propTypes = {
  form: PropTypes.shape({
    site: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

export default PasswordForm;
