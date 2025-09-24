import { render, screen, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { SubscriptionProvider } from '@/context/SubscriptionContext';

import formatCurrency from '@/common/utils/formatCurrency';

import { IUserDataUpdate } from '@/common/@types/user';

import userUpdate from '@/action/user-update';

import UpgradeAccountForm from '@/components/auth/UpgradeAccountForm';

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ subscription: 'professional' }),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock('@/context/UserContext', () => ({
  useUser: jest.fn().mockReturnValue({
    setUser: jest.fn(),
  }),
}));

jest.mock('@/action/user-update');

jest.mock('react-toastify');

const subscriptions = [
  {
    _id: '0',
    name: 'professional',
    price: 84999,
    benefits: ['beneficio 1', 'beneficio 2', 'beneficio 3'],
    fullaccess: true,
  },
  {
    _id: '1',
    name: 'scholar',
    price: 34999,
    benefits: ['beneficio 1', 'beneficio 2'],
    fullaccess: false,
  },
];

describe('UpgradeAccountForm', () => {
  beforeEach(() => {
    render(
      <SubscriptionProvider subscriptions={subscriptions}>
        <UpgradeAccountForm />
      </SubscriptionProvider>
    );
  });

  describe('First Step', () => {
    describe('Render', () => {
      it('should render the Select, benefits and price', async () => {
        const title = screen.getByRole('heading', {
          name: /Atualize sua assinatura/i,
        });
        expect(title).toBeInTheDocument();

        const prevButton = screen.getByRole('button', { name: /anterior/i });
        expect(prevButton).toBeInTheDocument();
        expect(prevButton).toBeDisabled();

        const nextButton = screen.getByRole('button', { name: /próximo/i });
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeEnabled();
      });
    });

    describe('Behavior', () => {
      it('should fill the form of the first step and be able to go to the next step', async () => {
        const selectElement = screen.getByLabelText('Selecione um plano *', {
          selector: 'input',
        });
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveValue(subscriptions[0]._id);

        const benefitList = screen.getByRole('list');
        const benefitItems = await within(benefitList).findAllByRole(
          'listitem'
        );
        expect(benefitItems).toHaveLength(3);

        const totalPurchaseTitle = screen.getByText(/total da compra:/i);
        expect(totalPurchaseTitle).toBeInTheDocument();

        const formattedPrice = formatCurrency(subscriptions[0].price);
        const totalPurchaseValue = screen.getByText(
          (_, element) => element?.textContent === formattedPrice
        );
        expect(totalPurchaseValue).toBeInTheDocument();
      });
    });
  });

  describe('Second Step', () => {
    async function goToSecondStep(user: UserEvent) {
      const firstStepNextButton = screen.getByRole('button', {
        name: /próximo/i,
      });
      await user.click(firstStepNextButton);
    }

    async function choosePaymentMethodAndFinalizePayment(user: UserEvent) {
      const inputPix = screen.getByLabelText(/pix/i);
      expect(inputPix).toBeInTheDocument();

      await user.click(inputPix);
      await user.tab();

      expect(inputPix).toBeChecked();

      const finalizePaymentButton = screen.getByRole('button', {
        name: /finalizar pagamento/i,
      });
      expect(finalizePaymentButton).toBeEnabled();

      await user.click(finalizePaymentButton);
    }

    describe('Render', () => {
      it('should render the buttons', async () => {
        await goToSecondStep(userEvent.setup());

        const prevButton = screen.getByRole('button', { name: /anterior/i });
        expect(prevButton).toBeInTheDocument();
        expect(prevButton).toBeEnabled();

        const finallyPaymentButton = screen.getByRole('button', {
          name: /finalizar pagamento/i,
        });
        expect(finallyPaymentButton).toBeInTheDocument();
        expect(finallyPaymentButton).toBeDisabled();
      });
    });

    describe('Behavior', () => {
      it('should fill the form and not display an error alert', async () => {
        const user = userEvent.setup();

        await goToSecondStep(user);

        const mockUserUpdateValue = {
          data: {
            updatedUser: {
              plan: {
                _id: subscriptions[0]._id,
                name: subscriptions[0].name,
                fullaccess: true,
              },
            },
          } as unknown as IUserDataUpdate,
          ok: true,
          error: '',
        };

        const mockUserUpdate = jest
          .mocked(userUpdate)
          .mockResolvedValue(mockUserUpdateValue);

        await choosePaymentMethodAndFinalizePayment(user);

        expect(mockUserUpdate).toHaveBeenCalledTimes(1);
        expect(mockUserUpdate.mock.calls[0][0]).toMatchObject({
          subscriptionId: subscriptions[0]._id,
          payment_method: 'pix',
        });

        const router = useRouter();

        expect(router.push).toHaveBeenCalledTimes(1);
        expect(router.push).toHaveBeenCalledWith('/dashboard');
      });

      it('should fill the form and display an error alert', async () => {
        const user = userEvent.setup();

        await goToSecondStep(user);

        const mockUserUpdateValue = {
          data: null,
          ok: false,
          error: 'Não foi possível atualizar a assinatura do usuário',
        } as const;

        const mockUserUpdate = jest
          .mocked(userUpdate)
          .mockResolvedValue(mockUserUpdateValue);

        await choosePaymentMethodAndFinalizePayment(user);

        expect(mockUserUpdate).toHaveBeenCalledTimes(1);
        expect(mockUserUpdate.mock.calls[0][0]).toMatchObject({
          subscriptionId: subscriptions[0]._id,
          payment_method: 'pix',
        });

        const toastErrorMock = toast.error as jest.Mock;
        expect(toastErrorMock).toHaveBeenCalledTimes(1);
        expect(toastErrorMock.mock.calls[0][0]).toBe(mockUserUpdateValue.error);

        const router = useRouter();
        expect(router.push).toHaveBeenCalledTimes(0);
      });
    });
  });
});
