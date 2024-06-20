import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
} from '../constants/env.constant.js';

// S3 클라이언트 설정
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// 파일 필터 설정 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('이미지 파일만 업로드할 수 있습니다.'));
  }
};

// multer 설정 (S3 버킷에 저장)
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    acl: 'public-read', // 파일 접근 권한 설정
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 1024 * 1024 * 5 }, // 파일 크기 제한 (5MB)
  fileFilter: fileFilter,
}).single('profileImage'); // 파일 필드 이름 명시

export { upload };
