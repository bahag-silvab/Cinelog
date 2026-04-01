import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const BCRYPT_ROUNDS = 12;
const JWT_EXPIRES_IN = '7d';

interface UserRow {
  id: number;
  name: string;
  email: string;
}

function signToken(payload: UserRow): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
}


export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    res.status(400).json({ error: 'name, email, and password are required' });
    return;
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'Email already in use' });
    return;
  }

  const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await User.create({ name, email, password: hashed });

  const token = signToken({ id: user.id, name: user.name, email: user.email });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const userPublic: UserRow = { id: user.id, name: user.name, email: user.email };
  const token = signToken(userPublic);
  res.json({ token, user: userPublic });
}
