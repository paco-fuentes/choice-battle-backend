export const createRoomService = (dependencies) => {
  const { roomRepository } = dependencies;

  return {
    getRoomById: async (roomId) => {
      return roomRepository.findById(roomId);
    },

    getRoomByCode: async (code) => {
      return roomRepository.findByCode(code);
    },

    getAllRooms: async () => {
      return roomRepository.findAll();
    },

    createRoom: async (roomData) => {
      return roomRepository.create(roomData);
    },

    updateRoom: async (roomId, roomData) => {
      return roomRepository.update(roomId, roomData);
    },

    deleteRoom: async (roomId) => {
      return roomRepository.delete(roomId);
    }
  };
};
