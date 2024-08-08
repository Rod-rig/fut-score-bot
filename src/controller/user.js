import prisma from "../utils/prisma.js";

class UserController {
  async createUser(req, res) {
    try {
      await prisma.user.create({
        data: {
          id: `${req.body.id}`,
          username: req.body.username ?? "",
          firstName: req.body.first_name ?? "",
          lastName: req.body.last_name ?? "",
        },
      });
      await prisma.results.create({
        data: {
          userId: `${req.body.id}`,
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(null);
    }
  }

  async getUsers(req, res) {
    const users = await prisma.user.findMany({
      include: {
        results: true,
      },
    });
    res.send(users);
  }

  async getUsersFullInfo(req, res) {
    const users = await prisma.user.findMany({
      include: {
        predictions: {
          include: {
            event: {
              include: {
                odd: true,
              },
            },
          },
        },
      },
    });
    res.send(users);
  }

  async getUser(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          predictions: {
            include: {
              event: {
                include: {
                  odd: true,
                },
              },
            },
          },
        },
      });
      res.json(user);
    } catch (error) {
      res.status(404).json(null);
    }
  }

  async updateUser(req, res) {
    try {
      const user = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          result: req.body.result,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export const userController = new UserController();
