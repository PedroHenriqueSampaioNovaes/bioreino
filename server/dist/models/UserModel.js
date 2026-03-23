import { Schema, model } from 'mongoose';
export const paymentMethods = [
    'pix',
    'credit_card',
    'bank_slip',
    'stripe',
];
const lastWatchedSchema = new Schema({
    course: { type: Schema.ObjectId, ref: 'Course', required: true },
    lesson: { type: Schema.ObjectId, ref: 'Lesson', required: true },
    watchedAt: Date,
}, { _id: true });
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: Schema.ObjectId, ref: 'Plan', required: true },
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
    payment_method: { type: String, enum: paymentMethods, required: true },
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
export const User = model('User', userSchema);
