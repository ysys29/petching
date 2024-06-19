import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../constants/env.constant.js';
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from '../constants/auth.constant.js';

//엑세스 토큰 발급 함수
export function createAccessToken({ id, role }) {
  try {
    console.log(ACCESS_TOKEN_SECRET);
    return jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
  } catch (error) {
    console.log('에러메세지', error.message);
  }
}
//리프레시 토큰 발급 함수
export function createRefreshToken(id, role) {
  return jwt.sign({ id, role }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
}
