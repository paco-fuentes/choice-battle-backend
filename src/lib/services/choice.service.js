export const createChoiceService = (dependencies) => {
  const { choiceRepository } = dependencies;

  return {
    getChoiceById: async (id) => {
      return choiceRepository.findById(id);
    },

    getChoicesByRoomId: async (roomId) => {
      return choiceRepository.findByRoomId(roomId);
    },

    createChoice: async (choiceData) => {
      return choiceRepository.create(choiceData);
    },

    updateChoice: async (id, choiceData) => {
      return choiceRepository.update(id, choiceData);
    },

    deleteChoice: async (id) => {
      return choiceRepository.delete(id);
    },

    voteForChoice: async (id) => {
      return choiceRepository.incrementHits(id);
    }
  };
};
