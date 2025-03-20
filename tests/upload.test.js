const handleImageUpload = require("../src/middlewares/upload");
const upload = require("../src/config/multer");
const responseHandler = require("../src/utils/response.handler");
const path = require("path");
const multer = require("multer");

jest.mock("../src/config/multer"); // Mock the multer config
jest.mock("../src/utils/response.handler"); // Mock the response handler

describe("Test Upload Middleware", () => {
  let next = jest.fn();

  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next if image is uploaded", () => {
    upload.single = jest.fn(() => (req, res, next) => {
      req.file = { filename: "test.png" };
      next();
    });

    handleImageUpload({}, {}, next);

    expect(upload.single).toHaveBeenCalledWith("image");
    expect(next).toHaveBeenCalled();
  });

  it("should call response handler with error 400 if no image is uploaded", () => {
    upload.single = jest.fn(() => (req, res, next) => next());

    handleImageUpload({}, {}, next);

    expect(upload.single).toHaveBeenCalledWith("image");
    expect(responseHandler).toHaveBeenCalledWith({}, 400, "Aucun fichier envoyé.", null, "Aucun fichier envoyé.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call responseHandler with error 400 if image size is too large", () => {
    const multerError = new multer.MulterError("LIMIT_FILE_SIZE");

    upload.single = jest.fn(() => (req, res, next) => next(multerError));

    handleImageUpload({}, {}, next);

    expect(upload.single).toHaveBeenCalledWith("image");
    expect(responseHandler).toHaveBeenCalledWith({}, 400, "Le fichier dépasse la taille maximale autorisée (5 Mo).", null, multerError);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call responseHandler with error 500 if image upload fails", () => {
    const error = new Error("Image upload failed");

    upload.single = jest.fn(() => (req, res, next) => next(error));

    handleImageUpload({}, {}, next);

    expect(upload.single).toHaveBeenCalledWith("image");
    expect(responseHandler).toHaveBeenCalledWith({}, 500, "Erreur serveur lors de l'upload.", null, error);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call responseHandler with error 400 if image upload fails with multer error", () => {
    const multerError = new multer.MulterError();

    upload.single = jest.fn(() => (req, res, next) => next(multerError));

    handleImageUpload({}, {}, next);

    expect(upload.single).toHaveBeenCalledWith("image");
    expect(responseHandler).toHaveBeenCalledWith({}, 400, "Erreur lors de l'upload.", null, multerError);
    expect(next).not.toHaveBeenCalled();
  });
});
