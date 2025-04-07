import { Schema, model, Types } from 'mongoose';
import { ISubscriptionPlan } from './SubscriptionPlanModel';

interface IUser {
  name: string;
  email: string;
  plan: Types.ObjectId | ISubscriptionPlan;
  password: string;
  coursesProgress: [
    {
      _id: Types.ObjectId;
      title: string;
      progress: number;
      lessonsViewed: [Types.ObjectId];
    }
  ];
  lastCourseAndLessonAcessed: {
    course: {
      courseTitle: string;
      slug: string;
      professor: string;
      imageUrl: string;
    };
    lastLesson: {
      lessonTitle: string;
      lessonDescription: string;
      slug: string;
    };
  };
  passwordResetToken: string;
  passwordResetExpires: Date;
  trialUserExpiresAfter: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: Schema.ObjectId, ref: 'Plan', required: true },
    password: { type: String, required: true },
    coursesProgress: {
      type: [
        {
          _id: Schema.ObjectId,
          title: { type: String, required: true },
          progress: { type: Number, required: true },
          lessonsViewed: { type: [Schema.ObjectId], required: true },
        },
      ],
    },
    lastCourseAndLessonAcessed: {
      course: Schema.ObjectId,
      lesson: Schema.ObjectId,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    trialUserExpiresAfter: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
