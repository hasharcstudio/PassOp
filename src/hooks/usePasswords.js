import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { getPasswords, savePasswords, deletePasswordById } from '../utils/storage';
import { copyToClipboard, truncateText } from '../utils/clipboard';
import { INITIAL_FORM_STATE, TOAST_ICONS } from '../constants';

/**
 * Custom hook for managing passwords
 * @returns {Object} Password management state and functions
 */
export const usePasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);

  // Load passwords from storage on mount
  useEffect(() => {
    const storedPasswords = getPasswords();
    setPasswords(storedPasswords);
  }, []);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    setIsEditing(false);
  }, []);

  // Validate form fields
  const validateForm = useCallback(() => {
    const { site, username, password } = form;
    
    if (!site.trim() || !username.trim() || !password.trim()) {
      toast.error('Please fill all fields!', { icon: TOAST_ICONS.WARNING });
      return false;
    }
    
    return true;
  }, [form]);

  // Save password
  const handleSavePassword = useCallback(() => {
    if (!validateForm()) return;

    const newPassword = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwords, newPassword];
    
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
    
    toast.success(isEditing ? 'Password updated!' : 'Password saved!', {
      icon: TOAST_ICONS.SAVE,
      description: `Saved credentials for ${form.site}`,
    });
    
    resetForm();
  }, [form, passwords, validateForm, resetForm, isEditing]);

  // Delete password with confirmation
  const handleDeletePassword = useCallback((id, skipConfirm = false) => {
    const passwordToDelete = passwords.find(item => item.id === id);
    
    if (!skipConfirm) {
      toast('Delete this password?', {
        icon: TOAST_ICONS.DELETE,
        description: passwordToDelete?.site || 'Unknown site',
        action: {
          label: 'Delete',
          onClick: () => {
            const updatedPasswords = deletePasswordById(id);
            setPasswords(updatedPasswords);
            toast.success('Password deleted!', { icon: TOAST_ICONS.SUCCESS });
          },
        },
        cancel: {
          label: 'Cancel',
          onClick: () => {},
        },
      });
      return;
    }
    
    const updatedPasswords = deletePasswordById(id);
    setPasswords(updatedPasswords);
  }, [passwords]);

  // Edit password
  const handleEditPassword = useCallback((id) => {
    const passwordToEdit = passwords.find(item => item.id === id);
    
    if (passwordToEdit) {
      setForm({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
      setIsEditing(true);
      handleDeletePassword(id, true);
      
      toast.info('Editing password...', {
        icon: TOAST_ICONS.EDIT,
        description: `Modify and save to update credentials for ${passwordToEdit.site}`,
      });
    }
  }, [passwords, handleDeletePassword]);

  // Copy text to clipboard with notification
  const handleCopyText = useCallback(async (text) => {
    const success = await copyToClipboard(text);
    
    if (success) {
      toast.success('Copied to clipboard!', {
        icon: TOAST_ICONS.COPY,
        description: truncateText(text),
      });
    } else {
      toast.error('Failed to copy!', { icon: TOAST_ICONS.ERROR });
    }
  }, []);

  return {
    passwords,
    form,
    isEditing,
    handleChange,
    handleSavePassword,
    handleDeletePassword,
    handleEditPassword,
    handleCopyText,
    resetForm,
  };
};

export default usePasswords;
