"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const plan = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    benefits: { type: [String], required: true },
    fullaccess: Boolean,
    stripe_price_id: { type: String, required: true },
});
exports.Plan = (0, mongoose_1.model)('Plan', plan);
