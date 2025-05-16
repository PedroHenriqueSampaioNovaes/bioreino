import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import resetPassword from '@/action/reset-password';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

jest.mock('@/action/reset-password');
jest.mock('react-toastify', () => ({
  toast: {
    ...jest.requireActual('react-toastify'),
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    render(
      <ResetPasswordForm searchParams={{ key: '123', email: 't@t.com' }} />
    );
  });

  describe('Render', () => {
    it('should render password input and label', () => {
      const passwordLabel = screen.getByText('Nova senha');
      const passwordInput = screen.getByLabelText('Nova senha');

      expect(passwordLabel).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should display an alert error when password is invalid', async () => {
      const button = screen.getByRole('button', { name: /Criar nova senha/ });
      fireEvent.click(button);

      const alertError = await screen.findByRole('alert');

      expect(alertError).toBeInTheDocument();
    });

    it('should display an alert error when the action fails', async () => {
      const toastErrorMessage = 'Erro ao tentar redefinir a senha';

      const mockedResetPasswordAction = (
        resetPassword as jest.Mock
      ).mockResolvedValue({
        ok: false,
        error: toastErrorMessage,
      });

      const passwordInput = screen.getByLabelText('Nova senha');
      fireEvent.change(passwordInput, { target: { value: '12345678' } });

      const button = screen.getByRole('button', { name: /Criar nova senha/ });
      fireEvent.click(button);

      await waitFor(() => {
        const alertError = screen.queryByRole('alert');
        expect(alertError).not.toBeInTheDocument();
      });

      expect(mockedResetPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockedResetPasswordAction).toHaveBeenCalledWith({
        key: '123',
        email: 't@t.com',
        password: '12345678',
      });

      const toastErrorMock = toast.error as jest.Mock;
      expect(toastErrorMock).toHaveBeenCalledTimes(1);
      expect(toastErrorMock.mock.calls[0][0]).toBe(toastErrorMessage);
    });

    it('should display an alert success when the action is successful', async () => {
      const toastSuccessfulMessage = 'Senha redefinida com sucesso!';

      const mockedResetPasswordAction = (
        resetPassword as jest.Mock
      ).mockResolvedValue({
        ok: true,
        data: toastSuccessfulMessage,
      });

      const passwordInput = screen.getByLabelText('Nova senha');
      fireEvent.change(passwordInput, { target: { value: '12345678' } });

      const button = screen.getByRole('button', { name: /Criar nova senha/ });
      fireEvent.click(button);

      await waitFor(() => {
        const alertError = screen.queryByRole('alert');
        expect(alertError).not.toBeInTheDocument();
      });

      expect(mockedResetPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockedResetPasswordAction).toHaveBeenCalledWith({
        key: '123',
        email: 't@t.com',
        password: '12345678',
      });

      const toastSuccessMock = toast.success as jest.Mock;
      expect(toastSuccessMock).toHaveBeenCalledTimes(1);
      expect(toastSuccessMock.mock.calls[0][0]).toBe(toastSuccessfulMessage);

      const routerPushMock = useRouter().push as jest.Mock;
      expect(routerPushMock).toHaveBeenCalledTimes(1);
      expect(routerPushMock.mock.calls[0][0]).toBe('/login');
    });
  });
});
