export const createRoomInviteService = (dependencies) => {
  const { roomInviteRepository } = dependencies;

  return {
    getInviteById: async (id) => {
      return roomInviteRepository.findById(id);
    },

    getInviteByCode: async (code) => {
      return roomInviteRepository.findByCode(code);
    },

    getInvitesByRoomId: async (roomId) => {
      return roomInviteRepository.findByRoomId(roomId);
    },

    createInvite: async (inviteData) => {
      return roomInviteRepository.create(inviteData);
    },

    updateInvite: async (id, inviteData) => {
      return roomInviteRepository.update(id, inviteData);
    },

    deleteInvite: async (id) => {
      return roomInviteRepository.delete(id);
    },

    useInvite: async (id) => {
      return roomInviteRepository.incrementUses(id);
    }
  };
};
