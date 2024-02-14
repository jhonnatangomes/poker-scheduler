import { Form, Link } from '@remix-run/react';
import { LoginButton, LoginInput } from '~/components';

export async function action() {}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <LoginInput
              name="username"
              type="text"
              required
              placeholder="Username"
            />
            <LoginInput
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
            />
          </div>
          <LoginButton type="submit">Sign in</LoginButton>
        </Form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
