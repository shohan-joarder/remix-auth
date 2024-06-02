// app/routes/login.jsx
import { Form, redirect } from '@remix-run/react';
import { authenticator } from './../utils/auth.server';
import { getSession } from '../utils/session.server';

export let action = async ({ request }) => {
  return authenticator.authenticate('user-pass', request, {
    successRedirect: '/protected',
    failureRedirect: '/login',
  });
};

export async function loader({request}){
    let session = await getSession(request.headers.get('Cookie'));
    let user = await authenticator.isAuthenticated(request);
    console.log(user)
    if (user) {
      // Redirect authenticated users to the dashboard (or another appropriate page)
      return redirect('/protected');
    }
  
    return null; // If not authenticated, proceed to render the login form
}

export default function Login() {
  return (
    <Form method="post">
      <div>
        <label>
          Username: <input type="text" name="username" required />
        </label>
      </div>
      <div>
        <label>
          Password: <input type="password" name="password" required />
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </Form>
  );
}
