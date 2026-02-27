export const createUserService = (dependencies) => {
  const { userRepository } = dependencies;

  return {
    getUserById: async (userId) => {
      return userRepository.findById(userId);
    },

    getAllUsers: async () => {
      return userRepository.findAll();
    },

    createUser: async (userData) => {
      return userRepository.create(userData);
    },

    updateUser: async (userId, userData) => {
      return userRepository.update(userId, userData);
    },

    deleteUser: async (userId) => {
      return userRepository.delete(userId);
    }
  };
};
