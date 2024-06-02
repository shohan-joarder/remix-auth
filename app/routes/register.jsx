// app/routes/register.jsx
import { useActionData, Form, redirect } from '@remix-run/react';
import bcrypt from 'bcryptjs';
import connect from './../utils/db';

export let action = async ({ request }) => {
  let form = await request.formData();
  let username = form.get('username');
  let password = form.get('password');
  let email = form.get('email');

  let hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connect.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
    return redirect("/login");
  } catch (error) {

    return { error: error};
  }
};

export default function Register() {
  let actionData = useActionData();

  return (
    <Form method="post">
      <div>
        <label>
          Username: <input type="text" name="username" required />
        </label>
      </div>
      <div>
        <label>
          Email: <input type="email" name="email" required />
        </label>
      </div>
      <div>
        <label>
          Password: <input type="password" name="password" required />
        </label>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
      {actionData?.success && <p>Registration successful!</p>}
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
    </Form>
  );
}
