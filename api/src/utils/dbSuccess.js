function dbSuccess(title, data = "", status = 200) {
  return {
    title,
    data,
    status,
  };
}

module.exports = dbSuccess;
