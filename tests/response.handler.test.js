const responseHandler = require("../src/utils/response.handler");

describe("Test Response Handler", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("should return success true for 2xx code", () => {
    const statusCode = 200;
    const message = "Success Request";
    const data = { id: 1 };

    responseHandler(res, statusCode, message, data);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message,
      data,
      error: null
    });
  });

  it("should return success false for 4xx code", () => {
    const statusCode = 400;
    const message = "Bad Request";
    const error = { message: "Bad Request" };

    responseHandler(res, statusCode, message, null, error);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message,
      data: null,
      error
    });
  });
});
