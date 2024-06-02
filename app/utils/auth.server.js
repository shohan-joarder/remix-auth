// app/utils/auth.server.js
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from './session.server';
import bcrypt from 'bcryptjs';
import pool from './db';

export let authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let username = form.get('username');
    let password = form.get('password');

    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      throw new Error('Invalid username or password');
    }

    let user = rows[0];
    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid username or password');
    }

    return user;
  }),
  'user-pass'
);

export async function requireUser(request) {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/login',
    });
    return user;
}
