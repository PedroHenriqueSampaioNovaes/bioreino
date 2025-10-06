"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ListCategoryController_1 = require("../controllers/category/ListCategoryController");
const router = (0, express_1.Router)();
router.get('/', ListCategoryController_1.ListCategoryController.handle);
exports.default = { router, baseRoute: '/categories' };
