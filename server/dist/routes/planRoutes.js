"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ListSubscriptionController_1 = require("../controllers/subscription/ListSubscriptionController");
const router = (0, express_1.Router)();
router.get('/', ListSubscriptionController_1.ListSubscriptionController.handle);
exports.default = { router, baseRoute: '/subscriptions' };
