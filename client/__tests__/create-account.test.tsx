import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import type { ISubscription } from '@/common/@types/subscription';
import { IUserCreate } from '@/common/@types/user';

import { type IStateBrazil, StatesProvider } from '@/context/StatesContext';
import { SubscriptionProvider } from '@/context/SubscriptionContext';

import userCreate from '@/action/user-create';

import CreateAccountForm from '@/components/auth/CreateAccountForm';

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ subscription: 'scholar' }),
}));

jest.mock('@/action/user-create');

async function fillFieldsFirstStep(userEvent: UserEvent) {
  const nameInput = screen.getByLabelText('Nome completo *');
  const emailInput = screen.getByLabelText('Email *');
  const cpfInput = screen.getByLabelText('CPF *');
  const passwordInput = screen.getByLabelText('Senha *');
  const confirmPasswordInput = screen.getByLabelText('Confirmar senha *');

  await userEvent.type(nameInput, 'Fulano');
  await userEvent.tab();
  await userEvent.type(emailInput, 't@t.com');
  await userEvent.tab();
  await userEvent.type(cpfInput, '111.111.111-11');
  await userEvent.tab();
  await userEvent.type(passwordInput, '12345678');
  await userEvent.tab();
  await userEvent.type(confirmPasswordInput, '12345678');
  await userEvent.tab();
}

async function nextStep(userEvent: UserEvent) {
  const nextButton = await screen.findByRole('button', {
    name: /próximo/i,
  });
  expect(nextButton).toBeEnabled();

  await userEvent.click(nextButton);
}

const subscriptions: ISubscription[] = [
  {
    _id: '0',
    name: 'scholar',
    price: 34999,
    benefits: ['beneficio 1', 'beneficio 2'],
    fullaccess: false,
  },
  {
    _id: '1',
    name: 'professional',
    price: 84999,
    benefits: ['beneficio 1', 'beneficio 2', 'beneficio 3', 'beneficio 4'],
    fullaccess: true,
  },
];

function setup() {
  return {
    user: userEvent.setup(),
    ...render(
      <StatesProvider
        states={
          [
            { id: 0, nome: 'São Paulo', sigla: 'SP' },
            { id: 1, nome: 'Minas Gerais', sigla: 'MG' },
          ] as IStateBrazil[]
        }
      >
        <SubscriptionProvider subscriptions={subscriptions as ISubscription[]}>
          <CreateAccountForm />
        </SubscriptionProvider>
      </StatesProvider>
    ),
  };
}

describe('CreateAccountForm', () => {
  describe('Render', () => {
    it('should render the form with all fields of the first step', () => {
      setup();

      const nameInput = screen.getByLabelText('Nome completo *');
      const emailInput = screen.getByLabelText('Email *');
      const cpfInput = screen.getByLabelText('CPF *');
      const passwordInput = screen.getByLabelText('Senha *');
      const confirmPasswordInput = screen.getByLabelText('Confirmar senha *');

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(cpfInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();

      const previousButton = screen.getByRole('button', { name: /anterior/i });
      const nextButton = screen.getByRole('button', { name: /próximo/i });

      expect(previousButton).toBeInTheDocument();
      expect(previousButton).toBeDisabled();
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Behavior', () => {
    describe('first step', () => {
      it('should display an error alert for each invalid field on onBlur', async () => {
        const { user } = setup();

        const nameInput = screen.getByLabelText('Nome completo *');
        const emailInput = screen.getByLabelText('Email *');
        const cpfInput = screen.getByLabelText('CPF *');
        const passwordInput = screen.getByLabelText('Senha *');
        const confirmPasswordInput = screen.getByLabelText('Confirmar senha *');

        await user.click(nameInput);
        await user.tab();
        await user.click(emailInput);
        await user.tab();
        await user.click(cpfInput);
        await user.tab();
        await user.click(passwordInput);
        await user.tab();
        await user.click(confirmPasswordInput);
        await user.tab();

        const alertErrors = await screen.findAllByRole('alert');
        expect(alertErrors).toHaveLength(5);

        const nextButton = screen.getByRole('button', { name: /próximo/i });
        expect(nextButton).toBeDisabled();
      });

      it('should be possible to go to the next step once all fields are filled in and valid', async () => {
        const { user } = setup();

        await fillFieldsFirstStep(user);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();

        await waitFor(() => {});

        await nextStep(user);

        expect(
          screen.getByRole('heading', { name: 'Total da compra:', level: 3 })
        ).toBeInTheDocument();

        const previousButton = screen.getByRole('button', {
          name: /anterior/i,
        });
        expect(previousButton).toBeEnabled();
      });
    });

    describe('second step', () => {
      async function goToSecondStep(userAction: UserEvent) {
        await fillFieldsFirstStep(userAction);
        await nextStep(userAction);
      }

      it('should display a field with a selected value and not display an error alert', async () => {
        const { user } = setup();

        await goToSecondStep(user);

        const prevButton = screen.getByRole('button', { name: /próximo/i });
        expect(prevButton).toBeEnabled();

        const selectElement = screen.getByRole('combobox', {
          name: 'Selecione um plano *',
        });

        await user.click(selectElement);
        await user.tab();

        expect(selectElement).toHaveTextContent(
          new RegExp(subscriptions[0].name, 'i')
        );

        const alertError = screen.queryByRole('alert');
        expect(alertError).not.toBeInTheDocument();

        const priceSubscription = screen.getByText('R$ 349,99');
        expect(priceSubscription).toBeInTheDocument();

        const nextButton = screen.getByRole('button', { name: /próximo/i });
        expect(nextButton).toBeEnabled();
      });

      it('should change the selected option and not display an error alert', async () => {
        const { user } = setup();

        await goToSecondStep(user);

        const selectElement = screen.getByRole('combobox', {
          name: 'Selecione um plano *',
        });

        await user.click(selectElement);

        const optionElement = await screen.findByRole('option', {
          name: new RegExp(subscriptions[1].name, 'i'),
        });

        await user.click(optionElement);
        await userEvent.tab();

        expect(selectElement).toHaveTextContent(
          new RegExp(subscriptions[1].name, 'i')
        );

        const alertError = screen.queryByRole('alert');
        expect(alertError).not.toBeInTheDocument();

        const priceSubscription = screen.getByText('R$ 849,99');
        expect(priceSubscription).toBeInTheDocument();

        const nextButton = screen.getByRole('button', { name: /próximo/i });
        expect(nextButton).toBeEnabled();
      });
    });

    describe('third step', () => {
      async function goToThirdStep(userAction: UserEvent) {
        await fillFieldsFirstStep(userAction);
        await nextStep(userAction);
        await nextStep(userAction);
      }

      it('should select the Pix payment method and complete the payment', async () => {
        const successObj: IUserCreate = {
          _id: '1',
          email: 't@t.com',
          password: '12345678',
          checkoutURL: null,
        };

        const userCreateValue = {
          data: successObj,
          error: '',
          ok: true,
        };

        const mockedUserCreateAction = jest
          .mocked(userCreate)
          .mockResolvedValue(userCreateValue);

        Object.defineProperty(window, 'location', {
          value: {
            href: '',
            assign: jest.fn(),
          },
          writable: true,
        });

        const { user } = setup();

        await goToThirdStep(user);

        const inputPixElement = screen.getByLabelText(/Pix/i);
        await user.click(inputPixElement);
        await user.tab();

        const finallyPaymentButton = screen.getByRole('button', {
          name: /finalizar pagamento/i,
        });
        expect(finallyPaymentButton).toBeEnabled();

        await user.click(finallyPaymentButton);

        expect(mockedUserCreateAction).toHaveBeenCalledTimes(1);
        await expect(
          mockedUserCreateAction.mock.results[0].value
        ).resolves.toEqual(userCreateValue);
      });
    });
  });
});
