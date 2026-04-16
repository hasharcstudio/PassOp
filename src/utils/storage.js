/**
 * Storage utility functions for managing passwords in localStorage
 */

const STORAGE_KEY = 'passwords';

/**
 * Get all passwords from localStorage
 * @returns {Array} Array of password objects
 */
export const getPasswords = () => {
  try {
    const passwords = localStorage.getItem(STORAGE_KEY);
    return passwords ? JSON.parse(passwords) : [];
  } catch (error) {
    console.error('Error reading passwords from storage:', error);
    return [];
  }
};

/**
 * Save passwords to localStorage
 * @param {Array} passwords - Array of password objects
 * @returns {boolean} Success status
 */
export const savePasswords = (passwords) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
    return true;
  } catch (error) {
    console.error('Error saving passwords to storage:', error);
    return false;
  }
};

/**
 * Add a new password to storage
 * @param {Object} password - Password object to add
 * @returns {Array} Updated passwords array
 */
export const addPassword = (password) => {
  const passwords = getPasswords();
  const updatedPasswords = [...passwords, password];
  savePasswords(updatedPasswords);
  return updatedPasswords;
};

/**
 * Delete a password from storage by ID
 * @param {string} id - ID of password to delete
 * @returns {Array} Updated passwords array
 */
export const deletePasswordById = (id) => {
  const passwords = getPasswords();
  const updatedPasswords = passwords.filter(item => item.id !== id);
  savePasswords(updatedPasswords);
  return updatedPasswords;
};

/**
 * Find a password by ID
 * @param {string} id - ID of password to find
 * @returns {Object|undefined} Password object or undefined
 */
export const findPasswordById = (id) => {
  const passwords = getPasswords();
  return passwords.find(item => item.id === id);
};
