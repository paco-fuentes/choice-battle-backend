export const validateCreateRoomParticipant = (input) => {
  const errors = [];

  if (!input.room_id) {
    errors.push('Room ID is required');
  }

  if (!input.user_id) {
    errors.push('User ID is required');
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};
