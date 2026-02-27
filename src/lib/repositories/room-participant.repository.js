export const createRoomParticipantRepository = (db) => ({
  findById: async (id) => {
    const { data, error } = await db
      .from('room_participants')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'Participant not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findByRoomId: async (roomId) => {
    const { data, error } = await db
      .from('room_participants')
      .select('*')
      .eq('room_id', roomId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  findByUserId: async (userId) => {
    const { data, error } = await db
      .from('room_participants')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  create: async (participantData) => {
    const { data, error } = await db
      .from('room_participants')
      .insert(participantData)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  delete: async (id) => {
    const { error } = await db
      .from('room_participants')
      .delete()
      .eq('id', id);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  },

  deleteByRoomAndUser: async (roomId, userId) => {
    const { error } = await db
      .from('room_participants')
      .delete()
      .eq('room_id', roomId)
      .eq('user_id', userId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  }
});
