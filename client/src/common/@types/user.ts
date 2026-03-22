export interface ILastWatched {
  course: {
    courseTitle: string;
    slug: string;
    professor: string;
    image: string;
  };
  lesson: {
    lessonTitle: string;
    lessonDescription: string;
    slug: string;
  };
  watchedAt: string;
}

type SubscriptionStatus =
  | 'open'
  | 'active'
  | 'incomplete'
  | 'canceled'
  | 'paused'
  | 'incomplete_expired'
  | 'trialing'
  | 'past_due'
  | 'unpaid'
  | null;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  plan: {
    _id: string;
    name: string;
    fullaccess: boolean;
  };
  lastWatched?: ILastWatched;
  status: SubscriptionStatus;
  payment_method: string;
}

export interface IUserCreate {
  _id: string;
  email: string;
  password: string;
  checkoutURL: string | null;
}

export interface IUserTemporaryCreate {
  _id: string;
  email: string;
  password: string;
  accountExpiresAfter: Date;
}

export interface IUserDataUpdate {
  updatedUser: Pick<
    IUser,
    '_id' | 'email' | 'plan' | 'status' | 'payment_method'
  >;
  stripeURL: string | null;
}
