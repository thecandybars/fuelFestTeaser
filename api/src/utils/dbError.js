function dbError(title, status = 400) {
  return {
    error: {
      title,
      status,
    },
  };
}

module.exports = dbError;
