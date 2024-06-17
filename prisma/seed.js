import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 펫시터 데이터
  const petsitter1 = await prisma.petsitter.create({
    data: {
      name: '펫시터1',
      experience: 1,
    },
  });
  const petsitter2 = await prisma.petsitter.create({
    data: {
      name: '펫시터2',
      experience: 2,
    },
  });
  const petsitter3 = await prisma.petsitter.create({
    data: {
      name: '펫시터3',
      experience: 3,
    },
  });

  //펫시터 서비스 데이터
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter1.id,
      animalType: 'dog',
      serviceType: 'feed',
    },
  });
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter1.id,
      animalType: 'etc',
      serviceType: 'walk',
    },
  });
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter2.id,
      animalType: 'etc',
      serviceType: 'walk',
    },
  });
  await prisma.petsitterService.create({
    data: {
      petsitterId: petsitter3.id,
      animalType: 'cat',
      serviceType: 'shower',
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
