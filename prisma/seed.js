import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 펫시터 데이터
  const petsitter1 = await prisma.petsitter.create({
    data: {
      name: '펫시터1',
      experience: 1,
      email: 'petsitter1@example.com',
      password: '$2b$10$PeRLSlDLgtIyHYm3xEWeOu7ttFUzwlA1X6ysqaFQmCiM.riFhlaIW', //123 해싱된 값
    },
  });
  const petsitter2 = await prisma.petsitter.create({
    data: {
      name: '펫시터2',
      experience: 2,
      email: 'petsitter2@example.com',
      password: '$2b$10$PeRLSlDLgtIyHYm3xEWeOu7ttFUzwlA1X6ysqaFQmCiM.riFhlaIW',
    },
  });
  const petsitter3 = await prisma.petsitter.create({
    data: {
      name: '펫시터3',
      experience: 3,
      email: 'petsitter3@example.com',
      password: '$2b$10$PeRLSlDLgtIyHYm3xEWeOu7ttFUzwlA1X6ysqaFQmCiM.riFhlaIW',
    },
  });

  //펫시터 서비스 데이터
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter1.id,
      animalType: 'DOG',
      serviceType: 'FEED',
    },
  });
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter1.id,
      animalType: 'ETC',
      serviceType: 'WALK',
    },
  });
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter2.id,
      animalType: 'ETC',
      serviceType: 'WALK',
    },
  });
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter3.id,
      animalType: 'CAT',
      serviceType: 'SHOWER',
    },
  });

  //펫시터 서비스 장소
  await prisma.petsitterLocation.create({
    data: {
      petsitterId: petsitter1.id,
      location: '서울',
    },
  });
  await prisma.petsitterLocation.create({
    data: {
      petsitterId: petsitter1.id,
      location: '대구',
      surcharge: 40000,
    },
  });
  await prisma.petsitterLocation.create({
    data: {
      petsitterId: petsitter2.id,
      location: '경주',
    },
  });
  await prisma.petsitterLocation.create({
    data: {
      petsitterId: petsitter3.id,
      location: '인천',
    },
  });
}

main()
  .then(() => {
    console.log('데이터 베이스 삽입 성공');
    prisma.$disconnect();
  })
  .catch((err) => {
    console.log('데이터 베이스 삽입 실패');
    prisma.$disconnect();
  });
