import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../constants/env.constant.js';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../constants/auth.constant.js';

//엑세스 토큰 발급 함수
export function createAccessToken({ id, role }) {
  return jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
}
//리프레시 토큰 발급 함수
export function createRefreshToken(id, role) {
  return jwt.sign({ id, role }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
}
