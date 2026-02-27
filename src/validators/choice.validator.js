export const validateCreateChoice = (input) => {
  const errors = [];

  if (!input.room_id) {
    errors.push('Room ID is required');
  }

  if (!input.label || typeof input.label !== 'string') {
    errors.push('Label is required');
  } else if (input.label.length < 1) {
    errors.push('Label must have at least 1 character');
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};

export const validateUpdateChoice = (input) => {
  const errors = [];

  if (input.label !== undefined) {
    if (typeof input.label !== 'string') {
      errors.push('Label must be a string');
    } else if (input.label.length < 1) {
      errors.push('Label must have at least 1 character');
    }
  }

  if (input.hits !== undefined) {
    if (typeof input.hits !== 'number' || input.hits < 0) {
      errors.push('Hits must be a non-negative number');
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};
