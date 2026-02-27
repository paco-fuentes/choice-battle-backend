export const validateCreateUser = (input) => {
  const errors = [];

  if (!input.username || typeof input.username !== 'string') {
    errors.push('Username is required');
  } else if (input.username.length < 2) {
    errors.push('Username must have at least 2 characters');
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};

export const validateUpdateUser = (input) => {
  const errors = [];

  if (input.username !== undefined) {
    if (typeof input.username !== 'string') {
      errors.push('Username must be a string');
    } else if (input.username.length < 2) {
      errors.push('Username must have at least 2 characters');
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};
