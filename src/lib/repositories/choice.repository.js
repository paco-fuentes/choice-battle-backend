export const createChoiceRepository = (db) => ({
  findById: async (id) => {
    const { data, error } = await db
      .from('choices')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'Choice not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findByRoomId: async (roomId) => {
    const { data, error } = await db
      .from('choices')
      .select('*')
      .eq('room_id', roomId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  create: async (choiceData) => {
    const { data, error } = await db
      .from('choices')
      .insert(choiceData)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  update: async (id, choiceData) => {
    const { data, error } = await db
      .from('choices')
      .update(choiceData)
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
      .from('choices')
      .delete()
      .eq('id', id);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  },

  incrementHits: async (id) => {
    const { data, error } = await db
      .from('choices')
      .update({ hits: db.raw('hits + 1') })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  }
});
