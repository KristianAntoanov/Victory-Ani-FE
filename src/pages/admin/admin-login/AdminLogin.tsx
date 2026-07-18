import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { LogIn, ShieldAlert } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';
import styles from './AdminLogin.module.css';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
type FormValues = z.infer<typeof schema>;

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  if (isAuthenticated) {
    return <Navigate to={ROUTES.admin.dashboard} replace />;
  }

  const onSubmit = async (values: FormValues) => {
    const result = await login(values.email, values.password);
    if (result.ok) {
      navigate(ROUTES.admin.dashboard, { replace: true });
    } else {
      setAuthError(result.error ?? 'Login failed.');
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

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate data-testid="admin-login-form">
          <div className={`form-field${errors.email ? ' has-error' : ''}`}>
            <label htmlFor="l-email">Email</label>
            <input id="l-email" type="email" autoComplete="username" {...register('email')} data-testid="login-email" />
            {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
          </div>
          <div className={`form-field${errors.password ? ' has-error' : ''}`}>
            <label htmlFor="l-password">Password</label>
            <input
              id="l-password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              data-testid="login-password"
            />
            {errors.password ? <p className="field-error">{errors.password.message}</p> : null}
          </div>

          {authError ? (
            <p className="field-error" role="alert" data-testid="login-error">
              {authError}
            </p>
          ) : null}

          <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting} data-testid="login-submit">
            <LogIn size={18} aria-hidden="true" /> <span>Sign In</span>
          </button>
        </form>

        <div className={styles.hint}>
          <p className={styles.hintTitle}>
            <ShieldAlert size={16} /> <strong>Backend authentication</strong>
          </p>
          Sign-in is sent to <code>/api/auth/login</code>.
        </div>
      </div>
    </div>
  );
}
