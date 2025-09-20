import { Schema, model, Types } from 'mongoose';

import Stripe from 'stripe';

export const paymentMethods = [
  'pix',
  'credit_card',
  'bank_slip',
  'stripe',
] as const;

interface ILastWatched {
  course: {
    courseTitle: string;
    slug: string;
    professor: string;
    imageUrl: string;
  };
  lesson: {
    lessonTitle: string;
    lessonDescription: string;
    slug: string;
  };
  watchedAt: Date;
}

export interface IUser {
  name: string;
  email: string;
  plan: Types.ObjectId;
  password: string;
  lastWatched?: ILastWatched;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  accountExpiresAfter?: Date;
  status: Stripe.Subscription.Status | null;
  payment_method: (typeof paymentMethods)[number];
  stripe_customer_id: string | null;
  stripe_subscription: null | {
    id: string;
    price_id: string;
  };
}

const lastWatchedSchema = new Schema<ILastWatched>(
  {
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
  },
  { _id: true }
);

const userSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
