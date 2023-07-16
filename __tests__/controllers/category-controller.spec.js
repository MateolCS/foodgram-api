const CategoryController = require("../../controllers/category-controller");
const Category = require("../models/category");
const mongoose = require("mongoose");

const mockResponse = {
  json: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
};

const mockRequest = {};

describe("CategoryController", () => {
  describe("getAll", () => {
    it("should return a list of categories", async () => {
      Category.find.mockImplementationOnce(() => {
        return {
          categories: [
            {
              name: "Category 1",
              posts: [],
            },
            {
              name: "Category 1",
              posts: [],
            },
          ],
        };
      });
      await CategoryController.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
