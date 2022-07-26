function dbError(title, status) {
  return {
    error: {
      title,
      status: status ? status : 418,
    },
  };
}

module.exports = dbError;
