import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async createUser(req, res) {
    await prisma.user.create({
      data: {
        id: req.body.chat.id,
        username: req.body.chat.username ?? "",
        firstName: req.body.chat.first_name ?? "",
        lastName: req.body.chat.last_name ?? "",
      },
    });
    res.status(200);
    res.send("OK");
  }

  async getUsers(req, res) {
    const users = await prisma.user.findMany();
    res.send(users);
  }

  async getUser(req, res) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(user);
  }
}

export const userController = new UserController();
