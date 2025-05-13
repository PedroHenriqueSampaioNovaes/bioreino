import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '@/components/auth/LoginForm';
import login from '@/action/login';
jest.mock('@/action/login');

describe('LoginForm', () => {
  beforeEach(() => {
    render(<Login />);
  });

  describe('Render', () => {
    it('should render e-mail input and label', () => {
      const emailLabel = screen.getByText('E-mail');
      const emailInput = screen.getByLabelText('E-mail');

      expect(emailLabel).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    it('should render password input and label', () => {
      const passwordLabel = screen.getByText('Senha');
      const passwordInput = screen.getByLabelText('Senha');

      expect(passwordInput).toBeVisible();
      expect(passwordLabel).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should display two alerts error when email and password are invalid', async () => {
      const button = screen.getByRole('button', { name: /Entrar/ });
      fireEvent.click(button);

      const alertErrors = await screen.findAllByRole('alert');

      expect(alertErrors).toHaveLength(2);
    });

    it('should display message error when password is invalid', async () => {
      const emailInput = screen.getByLabelText('E-mail');
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });

      const passwordInput = screen.getByLabelText('Senha');
      fireEvent.change(passwordInput, { target: { value: '123' } });

      const button = screen.getByRole('button', { name: /Entrar/ });
      fireEvent.click(button);

      const alertErrors = await screen.findAllByRole('alert');

      expect(alertErrors).toHaveLength(1);
      expect(alertErrors[0]).toHaveTextContent('Mínimo 8 caracteres');

      expect(emailInput).toHaveValue('teste@teste.com');
    });

    it('should display message error when action login fails', async () => {
      const mockedLogin = jest.mocked(login).mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          error: 'E-mail ou senha incorreto.',
          data: null,
        });
      });
      const emailInput = screen.getByLabelText('E-mail');
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });

      const passwordInput = screen.getByLabelText('Senha');
      fireEvent.change(passwordInput, { target: { value: '12345678' } });

      const button = screen.getByRole('button', { name: /Entrar/ });
      fireEvent.click(button);

      await waitFor(async () => {
        expect(mockedLogin).toHaveBeenCalledTimes(1);
        expect(mockedLogin).toHaveBeenCalledWith({
          email: 'teste@teste.com',
          password: '12345678',
        });
      });

      const alertError = screen.getAllByRole('alert');
      expect(alertError).toHaveLength(1);
      expect(alertError[0]).toHaveTextContent(/^E-mail ou senha incorreto.$/);
    });

    it('should not display error when value is valid', async () => {
      const mockedLogin = jest.mocked(login).mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          error: '',
          data: null,
        });
      });

      Object.defineProperty(window, 'location', {
        value: {
          href: '',
          assign: jest.fn(),
        },
        writable: true,
      });

      const emailInput = screen.getByLabelText('E-mail');
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });

      const passwordInput = screen.getByLabelText('Senha');
      fireEvent.change(passwordInput, { target: { value: '12345678' } });

      const button = screen.getByRole('button', { name: /Entrar/ });
      fireEvent.click(button);

      await waitFor(async () => {
        expect(emailInput).toHaveValue('teste@teste.com');
        expect(passwordInput).toHaveValue('12345678');
      });

      const alertError = screen.queryAllByRole('alert');
      expect(alertError).toHaveLength(0);
      expect(mockedLogin).toHaveBeenCalledTimes(1);
      expect(window.location.href).toBe('/dashboard');
    });
  });
});
