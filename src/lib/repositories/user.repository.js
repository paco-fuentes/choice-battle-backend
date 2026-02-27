export const createUserRepository = (db) => ({
  findById: async (id) => {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message || 'User not found', exists: false };
    }

    return { ok: true, data, exists: true };
  },

  findAll: async () => {
    const { data, error } = await db
      .from('users')
      .select('*');

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  create: async (userData) => {
    const { data, error } = await db
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  },

  update: async (id, userData) => {
    const { data, error } = await db
      .from('users')
      .update(userData)
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
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  }
});
