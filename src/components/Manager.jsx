import { Logo } from './common';
import { PasswordForm, PasswordTable } from './password';
import usePasswords from '../hooks/usePasswords';

/**
 * Main password manager component
 */
const Manager = () => {
  const {
    passwords,
    form,
    isEditing,
    handleChange,
    handleSavePassword,
    handleDeletePassword,
    handleEditPassword,
    handleCopyText,
  } = usePasswords();

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <Logo size="lg" className="justify-center flex" />
          <p className="text-green-800 text-lg">
            Your own secure password manager
          </p>
        </header>

        {/* Password Form */}
        <PasswordForm
          form={form}
          onChange={handleChange}
          onSave={handleSavePassword}
          isEditing={isEditing}
        />

        {/* Passwords Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🔑</span>
            <span>Your Passwords</span>
            {passwords.length > 0 && (
              <span className="bg-green-100 text-green-700 text-sm px-2 py-0.5 rounded-full">
                {passwords.length}
              </span>
            )}
          </h2>
          
          <PasswordTable
            passwords={passwords}
            onCopy={handleCopyText}
            onEdit={handleEditPassword}
            onDelete={handleDeletePassword}
          />
        </section>
      </div>
    </main>
  );
};

export default Manager;
