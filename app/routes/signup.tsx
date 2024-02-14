import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { LoginInput, LoginButton } from '~/components';

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const [username, password, confirmPassword] = [
    formData.get('username'),
    formData.get('password'),
    formData.get('confirm-password'),
  ];
  if (password !== confirmPassword) {
    return json({ error: 'Passwords do not match' }, { status: 400 });
  }
}

export default function Logout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
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
            <LoginInput
              name="confirm-password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Confirm Password"
            />
          </div>
          <LoginButton type="submit">Sign up</LoginButton>
        </Form>
      </div>
    </div>
  );
}
