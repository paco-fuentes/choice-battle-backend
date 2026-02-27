export const createRoomRepository = (db) => ({
  findById: async (id) => {
    const { data, error } = await db
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'Room not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findByCode: async (code) => {
    const { data, error } = await db
      .from('rooms')
      .select('*')
      .eq('code', code)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'Room not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findAll: async () => {
    const { data, error } = await db
      .from('rooms')
      .select('*');

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  create: async (roomData) => {
    const { data, error } = await db
      .from('rooms')
      .insert(roomData)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  update: async (id, roomData) => {
    const { data, error } = await db
      .from('rooms')
      .update(roomData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  delete: async (id) => {
    const { error } = await db
      .from('rooms')
      .delete()
      .eq('id', id);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  }
});
