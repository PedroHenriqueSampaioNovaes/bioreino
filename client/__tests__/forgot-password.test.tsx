import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import forgotPassword from '@/action/forgot-password';
import { toast } from 'react-toastify';

jest.mock('@/action/forgot-password');
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    success: jest.fn(),
  },
}));

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    render(<ForgotPasswordForm />);
  });

  describe('Render', () => {
    it('should render e-mail input and label', () => {
      const emailLabel = screen.getByText('Email');
      const emailInput = screen.getByLabelText('Email');

      expect(emailLabel).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should display a alert error when input email are invalid', async () => {
      const button = screen.getByRole('button', { name: /Enviar email/ });
      fireEvent.click(button);

      const alertError = await screen.findByRole('alert');

      expect(alertError).toBeInTheDocument();
    });

    it('should not display error message when value is valid', async () => {
      const successMessage = 'Email enviado com sucesso!';
      const testEmail = 't@t.com';

      const mockedForgotPasswordAction = jest
        .mocked(forgotPassword)
        .mockImplementation(() => {
          return Promise.resolve({
            data: successMessage,
            error: '',
            ok: true,
          });
        });

      const inputEmail = screen.getByLabelText('Email');
      fireEvent.change(inputEmail, { target: { value: testEmail } });

      const button = screen.getByRole('button', { name: /Enviar email/ });
      fireEvent.click(button);

      await waitFor(() => {
        const errorAlert = screen.queryByRole('alert');
        expect(errorAlert).not.toBeInTheDocument();
      });

      expect(mockedForgotPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockedForgotPasswordAction).toHaveBeenCalledWith({
        email: testEmail,
      });

      const toastSuccessMock = toast.success as jest.Mock;
      expect(toastSuccessMock).toHaveBeenCalledTimes(1);
      expect(toastSuccessMock.mock.calls[0][0]).toBe(successMessage);
    });
  });
});
