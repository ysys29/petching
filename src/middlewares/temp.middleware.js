export default async function (req, res, next) {
  const user1 = {
    id: 1,
    role: 'user',
  };

  const user2 = {
    id: 2,
    role: 'user',
  };

  const petsitter1 = {
    id: 9,
    role: 'petsitter',
  };

  const petsitter2 = {
    id: 10,
    role: 'petsitter',
  };

  req.user = petsitter2;
  next();
}
