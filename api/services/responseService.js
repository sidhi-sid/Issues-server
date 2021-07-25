module.exports = {
  sendOopsError(res) {
    res.status(500).send({
      success: false,
      statusCode: 500,
      statusMessage: "Oops! something went wrong",
    });
  },

  sendErrResponse(res, params) {
    const { message, code = 422 } = params;

    res.send({
      success: false,
      statusCode: code,
      statusMessage: message || "Oops! something went wrong",
    });
  },

  sendSuccessResponse(res, params = {}) {
    const { message, data, code } = params;

    res.send({
      success: true,
      statusCode: code || 200,
      statusMessage: message || "done successfully",
      data: data || null,
    });
  },
};
