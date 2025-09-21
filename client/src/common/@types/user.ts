export interface ILastWatched {
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

export interface IUserPost {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  subscriptionId: string;
  payment_method?: string;
  state?: string;
  cep?: string;
  street?: string;
  home_number?: string;
  neighborhood?: string;
  card_number?: string;
  cardholder_name?: string;
  validate?: string;
  cvv?: string;
  installment?: string;
}

export interface IUserUpdate {
  subscriptionId: string;
  payment_method: string;
}

export interface IUserDataUpdate {
  updatedUser: Pick<
    IUser,
    '_id' | 'email' | 'plan' | 'status' | 'payment_method'
  >;
  stripeURL: string | null;
}
