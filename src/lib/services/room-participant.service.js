export const createRoomParticipantService = (dependencies) => {
  const { roomParticipantRepository } = dependencies;

  return {
    getParticipantById: async (id) => {
      return roomParticipantRepository.findById(id);
    },

    getParticipantsByRoomId: async (roomId) => {
      return roomParticipantRepository.findByRoomId(roomId);
    },

    getParticipantsByUserId: async (userId) => {
      return roomParticipantRepository.findByUserId(userId);
    },

    addParticipant: async (participantData) => {
      return roomParticipantRepository.create(participantData);
    },

    removeParticipant: async (id) => {
      return roomParticipantRepository.delete(id);
    },

    removeParticipantByRoomAndUser: async (roomId, userId) => {
      return roomParticipantRepository.deleteByRoomAndUser(roomId, userId);
    }
  };
};
