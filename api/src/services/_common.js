function dbError(title, status) {
  return {
    error: {
      title,
      status,
    },
  };
}

module.exports = {
  dbError,
};
