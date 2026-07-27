import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Eye, EyeOff, LogIn, ShieldAlert } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';
import { authService, type IdentityAuthResponse, type TwoFactorSetupResponse } from '@/services/authService';
import styles from './AdminLogin.module.css';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
type FormValues = z.infer<typeof schema>;

const passwordChangeSchema = z
  .object({
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmNewPassword: z.string().min(1, 'Confirm your new password'),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: 'New password and confirmation do not match',
    path: ['confirmNewPassword'],
  });
type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;

export default function AdminLogin() {
  const { isAuthenticated, authenticate } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | 'password-change' | 'two-factor-setup' | 'two-factor-code'>(
    'credentials',
  );
  const [pendingEmail, setPendingEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordChangeToken, setPasswordChangeToken] = useState('');
  const [twoFactorSetupToken, setTwoFactorSetupToken] = useState('');
  const [twoFactorLoginToken, setTwoFactorLoginToken] = useState('');
  const [setupDetails, setSetupDetails] = useState<TwoFactorSetupResponse | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loadingStep, setLoadingStep] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const {
    register: registerPasswordChange,
    handleSubmit: handlePasswordChangeSubmit,
    reset: resetPasswordChangeForm,
    formState: { errors: passwordChangeErrors },
  } = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' },
  });

  if (isAuthenticated) {
    return <Navigate to={ROUTES.admin.dashboard} replace />;
  }

  const resetPendingAuth = () => {
    setPendingEmail('');
    setCurrentPassword('');
    setPasswordChangeToken('');
    setTwoFactorSetupToken('');
    setTwoFactorLoginToken('');
    setSetupDetails(null);
    setTwoFactorCode('');
    setShowLoginPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    resetPasswordChangeForm();
  };

  const completeAuthStep = async (response: IdentityAuthResponse, fallbackEmail: string) => {
    if (response.token) {
      resetPendingAuth();
      authenticate(authService.createSession(response, fallbackEmail));
      navigate(ROUTES.admin.dashboard, { replace: true });
      return;
    }

    if (response.requiresPasswordChange && response.passwordChangeToken) {
      setPendingEmail(response.userName ?? fallbackEmail);
      setPasswordChangeToken(response.passwordChangeToken);
      resetPasswordChangeForm();
      setStep('password-change');
      return;
    }

    if (response.requiresTwoFactorSetup && response.twoFactorSetupToken) {
      setPendingEmail(response.userName ?? fallbackEmail);
      setTwoFactorSetupToken(response.twoFactorSetupToken);
      setTwoFactorCode('');
      const details = await authService.getTwoFactorSetup(response.twoFactorSetupToken);
      setSetupDetails(details);
      setStep('two-factor-setup');
      return;
    }

    if (response.requiresTwoFactorCode && response.twoFactorLoginToken) {
      setPendingEmail(response.userName ?? fallbackEmail);
      setTwoFactorLoginToken(response.twoFactorLoginToken);
      setTwoFactorCode('');
      setStep('two-factor-code');
      return;
    }

    throw new Error('The backend did not return a supported authentication step.');
  };

  const onSubmit = async (values: FormValues) => {
    setAuthError(null);
    setLoadingStep(true);
    try {
      setPendingEmail(values.email);
      setCurrentPassword(values.password);
      const response = await authService.login(values.email, values.password);
      await completeAuthStep(response, values.email);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoadingStep(false);
    }
  };

  const submitTemporaryPassword = async (values: PasswordChangeValues) => {
    setAuthError(null);
    setLoadingStep(true);
    try {
      if (!passwordChangeToken || !currentPassword) {
        throw new Error('Password change session expired. Please sign in again.');
      }
      const response = await authService.changeTemporaryPassword({
        passwordChangeToken,
        currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });
      setCurrentPassword('');
      setPasswordChangeToken('');
      resetPasswordChangeForm();
      await completeAuthStep(response, pendingEmail);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Could not change password.');
    } finally {
      setLoadingStep(false);
    }
  };

  const returnToCredentials = () => {
    setAuthError(null);
    resetPendingAuth();
    setStep('credentials');
  };

  const submitTwoFactorSetup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setLoadingStep(true);
    try {
      const response = await authService.enableTwoFactor(twoFactorSetupToken, twoFactorCode);
      setTwoFactorCode('');
      await completeAuthStep(response, pendingEmail);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Could not enable two-factor authentication.');
    } finally {
      setLoadingStep(false);
    }
  };

  const submitTwoFactorCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setLoadingStep(true);
    try {
      const response = await authService.loginWithTwoFactor(twoFactorLoginToken, twoFactorCode);
      setTwoFactorCode('');
      await completeAuthStep(response, pendingEmail);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Invalid two-factor code.');
    } finally {
      setLoadingStep(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Helmet>
        <title>Admin Login | V&A Projects</title>
      </Helmet>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <Logo variant="sm" />
        </div>
        <h1>Admin Login</h1>
        <p className={styles.sub}>Sign in to manage news and content.</p>

        {step === 'credentials' ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate data-testid="admin-login-form">
            <div className={`form-field${errors.email ? ' has-error' : ''}`}>
              <label htmlFor="l-email">Email</label>
              <input id="l-email" type="email" autoComplete="username" {...register('email')} data-testid="login-email" />
              {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
            </div>
            <div className={`form-field${errors.password ? ' has-error' : ''}`}>
              <label htmlFor="l-password">Password</label>
              <div className={styles.passwordField}>
                <input
                  id="l-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  data-testid="login-password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowLoginPassword((visible) => !visible)}
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {errors.password ? <p className="field-error">{errors.password.message}</p> : null}
            </div>

            {authError ? (
              <p className="field-error" role="alert" data-testid="login-error">
                {authError}
              </p>
            ) : null}

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={isSubmitting || loadingStep}
              data-testid="login-submit"
            >
              <LogIn size={18} aria-hidden="true" /> <span>Sign In</span>
            </button>
          </form>
        ) : null}

        {step === 'password-change' ? (
          <form
            className={styles.form}
            onSubmit={handlePasswordChangeSubmit(submitTemporaryPassword)}
            noValidate
            data-testid="password-change-form"
          >
            <div className={styles.hint}>
              <p className={styles.hintTitle}>
                <ShieldAlert size={16} /> <strong>Password change required</strong>
              </p>
              <p>{pendingEmail} must choose a new password before entering the admin panel.</p>
            </div>
            <div className={`form-field${passwordChangeErrors.newPassword ? ' has-error' : ''}`}>
              <label htmlFor="new-password">New password</label>
              <div className={styles.passwordField}>
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...registerPasswordChange('newPassword')}
                  data-testid="new-password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowNewPassword((visible) => !visible)}
                  aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  title={showNewPassword ? 'Hide new password' : 'Show new password'}
                >
                  {showNewPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {passwordChangeErrors.newPassword ? (
                <p className="field-error">{passwordChangeErrors.newPassword.message}</p>
              ) : null}
            </div>
            <div className={`form-field${passwordChangeErrors.confirmNewPassword ? ' has-error' : ''}`}>
              <label htmlFor="confirm-new-password">Confirm new password</label>
              <div className={styles.passwordField}>
                <input
                  id="confirm-new-password"
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...registerPasswordChange('confirmNewPassword')}
                  data-testid="confirm-new-password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmNewPassword((visible) => !visible)}
                  aria-label={showConfirmNewPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                  title={showConfirmNewPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                >
                  {showConfirmNewPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {passwordChangeErrors.confirmNewPassword ? (
                <p className="field-error">{passwordChangeErrors.confirmNewPassword.message}</p>
              ) : null}
            </div>
            {authError ? <p className="field-error" role="alert">{authError}</p> : null}
            <button type="submit" className="btn btn--primary btn--block" disabled={loadingStep}>
              Continue
            </button>
            <button type="button" className="btn btn--ghost btn--block" onClick={returnToCredentials} disabled={loadingStep}>
              <ArrowLeft size={18} aria-hidden="true" /> <span>Back to Sign In</span>
            </button>
          </form>
        ) : null}

        {step === 'two-factor-setup' ? (
          <form className={styles.form} onSubmit={submitTwoFactorSetup} noValidate data-testid="two-factor-setup-form">
            <div className={styles.hint}>
              <p className={styles.hintTitle}>
                <ShieldAlert size={16} /> <strong>Set up authenticator</strong>
              </p>
              <p>Shared key: <code>{setupDetails?.sharedKey}</code></p>
              <p className={styles.hintNote}>Authenticator URI: <code>{setupDetails?.authenticatorUri}</code></p>
            </div>
            <div className="form-field">
              <label htmlFor="setup-code">6-digit code</label>
              <input
                id="setup-code"
                type="text"
                inputMode="numeric"
                value={twoFactorCode}
                onChange={(event) => setTwoFactorCode(event.target.value)}
                required
              />
            </div>
            {authError ? <p className="field-error" role="alert">{authError}</p> : null}
            <button type="submit" className="btn btn--primary btn--block" disabled={loadingStep}>
              Enable and Sign In
            </button>
          </form>
        ) : null}

        {step === 'two-factor-code' ? (
          <form className={styles.form} onSubmit={submitTwoFactorCode} noValidate data-testid="two-factor-code-form">
            <div className="form-field">
              <label htmlFor="login-code">6-digit code</label>
              <input
                id="login-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={twoFactorCode}
                onChange={(event) => setTwoFactorCode(event.target.value)}
                required
              />
            </div>
            {authError ? <p className="field-error" role="alert">{authError}</p> : null}
            <button type="submit" className="btn btn--primary btn--block" disabled={loadingStep}>
              Verify and Sign In
            </button>
          </form>
        ) : null}

        <div className={styles.hint}>
          <p className={styles.hintTitle}>
            <ShieldAlert size={16} /> <strong>Backend authentication</strong>
          </p>
          Sign-in is sent to <code>/api/Identity/Login</code>.
        </div>
      </div>
    </div>
  );
}
