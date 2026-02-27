export const createRoomInviteRepository = (db) => ({
  findById: async (id) => {
    const { data, error } = await db
      .from('room_invites')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'Invite not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findByCode: async (code) => {
    const { data, error } = await db
      .from('room_invites')
      .select('*')
      .eq('code', code)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'Invite not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findByRoomId: async (roomId) => {
    const { data, error } = await db
      .from('room_invites')
      .select('*')
      .eq('room_id', roomId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  create: async (inviteData) => {
    const { data, error } = await db
      .from('room_invites')
      .insert(inviteData)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  update: async (id, inviteData) => {
    const { data, error } = await db
      .from('room_invites')
      .update(inviteData)
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
      .from('room_invites')
      .delete()
      .eq('id', id);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  },

  incrementUses: async (id) => {
    const { data, error } = await db
      .from('room_invites')
      .update({ uses: db.raw('uses + 1') })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  }
});
