import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { getSession } from '~/sessions';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  if (!session.has('jwt')) {
    return redirect('/login');
  }
  return null;
}

export default function Index() {
  return <div>Logged In</div>;
}
