import CreateAccountForm from '@/components/auth/CreateAccountForm';
import UpgradeAccountForm from '@/components/auth/UpgradeAccountForm';

import { redirect } from 'next/navigation';

import getUser from '@/action/user-get';

export default async function SubscriptionParamPage() {
  const { data: user } = await getUser();

  if (user?.plan.fullaccess) redirect('/dashboard');
  return user ? <UpgradeAccountForm /> : <CreateAccountForm />;
}
