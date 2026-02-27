export const validateCreateRoom = (input) => {
  const errors = [];

  if (!input.code || typeof input.code !== 'string') {
    errors.push('Code is required');
  } else if (input.code.length < 3) {
    errors.push('Code must have at least 3 characters');
  }

  if (input.status !== undefined) {
    const validStatuses = ['lobby', 'playing', 'finished'];
    if (!validStatuses.includes(input.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};

export const validateUpdateRoom = (input) => {
  const errors = [];

  if (input.code !== undefined) {
    if (typeof input.code !== 'string') {
      errors.push('Code must be a string');
    } else if (input.code.length < 3) {
      errors.push('Code must have at least 3 characters');
    }
  }

  if (input.status !== undefined) {
    const validStatuses = ['lobby', 'playing', 'finished'];
    if (!validStatuses.includes(input.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};
