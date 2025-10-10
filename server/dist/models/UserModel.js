"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.paymentMethods = void 0;
const mongoose_1 = require("mongoose");
exports.paymentMethods = [
    'pix',
    'credit_card',
    'bank_slip',
    'stripe',
];
const lastWatchedSchema = new mongoose_1.Schema({
    course: {
        courseTitle: String,
        slug: String,
        professor: String,
        imageUrl: String,
    },
    lesson: {
        lessonTitle: String,
        lessonDescription: String,
        slug: String,
    },
    watchedAt: Date,
}, { _id: true });
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: mongoose_1.Schema.ObjectId, ref: 'Plan', required: true },
    password: { type: String, required: true },
    lastWatched: lastWatchedSchema,
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    accountExpiresAfter: {
        type: Date,
        select: false,
    },
    status: {
        type: String,
        default: null,
    },
    payment_method: { type: String, enum: exports.paymentMethods, required: true },
    stripe_customer_id: {
        type: String,
        default: null,
    },
    stripe_subscription: {
        type: {
            id: String,
            price_id: String,
        },
        default: null,
        _id: false,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
