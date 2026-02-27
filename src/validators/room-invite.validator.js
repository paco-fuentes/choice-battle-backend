export const validateCreateRoomInvite = (input) => {
  const errors = [];

  if (!input.room_id) {
    errors.push('Room ID is required');
  }

  if (!input.code || typeof input.code !== 'string') {
    errors.push('Code is required');
  }

  if (input.max_uses !== undefined) {
    if (typeof input.max_uses !== 'number' || input.max_uses <= 0) {
      errors.push('Max uses must be a positive number');
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};

export const validateUpdateRoomInvite = (input) => {
  const errors = [];

  if (input.max_uses !== undefined) {
    if (typeof input.max_uses !== 'number' || input.max_uses <= 0) {
      errors.push('Max uses must be a positive number');
    }
  }

  if (input.uses !== undefined) {
    if (typeof input.uses !== 'number' || input.uses < 0) {
      errors.push('Uses must be a non-negative number');
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};
