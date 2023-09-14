import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async createUser(req, res) {
    try {
      console.log(req.body);
      await prisma.user.create({
        data: {
          id: parseInt(req.body.id),
          username: req.body.username ?? "",
          firstName: req.body.first_name ?? "",
          lastName: req.body.last_name ?? "",
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(null);
    }
  }

  async getUsers(req, res) {
    const users = await prisma.user.findMany();
    res.send(users);
  }

  async getUser(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json(user);
    } catch (error) {
      res.status(404).json(null);
    }
  }
}

export const userController = new UserController();
