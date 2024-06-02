// app/routes/logout.jsx
import {redirect } from '@remix-run/react';
// import { authenticator } from '../utils/auth.server';
import { sessionStorage } from '../utils/session.server';
import { requireUser } from '../utils/auth.server';


export async function loader({request}) {
    let user = await requireUser(request);
    let session = await sessionStorage.getSession(request.headers.get('Cookie'));
    return redirect('/login', {
        headers: {
          'Set-Cookie': await sessionStorage.destroySession(session),
        },
    });
  }


export default function Logout() {
  return <div>Logging out...</div>;
}
