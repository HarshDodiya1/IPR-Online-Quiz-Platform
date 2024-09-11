const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient({
  log: ["query"],
});

module.exports = prisma;
