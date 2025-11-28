import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { UserModel } from '../models/postgres/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Initialize the UserModel with the database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Zszhpq1oLul5@ep-summer-waterfall-adtkjudj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

const userModel = new UserModel(pool);

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Initialize database tables
export async function initDatabase() {
  await userModel.createTable();
}

// POST /api/auth/register
export async function registerUser(req: Request, res: Response) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email and password are required' });
    }

    const existing = await userModel.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userModel.createUser({ name, email, password, phone });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user.id)
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// POST /api/auth/login
export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await userModel.comparePassword(email, password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user.id)
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

