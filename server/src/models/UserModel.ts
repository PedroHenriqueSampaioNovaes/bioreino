import { Schema, model, Types } from 'mongoose';

import { IPlan } from './PlanModel';

interface IUser {
  name: string;
  email: string;
  plan: Types.ObjectId | IPlan;
  password: string;
  lastWatched: {
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
  };
  passwordResetToken: string;
  passwordResetExpires: Date;
  accountExpiresAfter: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: Schema.ObjectId, ref: 'Plan', required: true },
    password: { type: String, required: true },
    lastWatched: {
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
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
