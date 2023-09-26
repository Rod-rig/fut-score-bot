import prisma from "../utils/prisma.js";

class OddController {
  async createOdd(req, res) {
    try {
      await prisma.odd.create({
        data: {
          eventId: parseInt(req.params.id),
          one: req.body.one,
          x: req.body.x,
          two: req.body.two,
          zeroZero: req.body.zeroZero,
          oneOne: req.body.oneOne,
          twoTwo: req.body.twoTwo,
          oneZero: req.body.oneZero,
          twoZero: req.body.twoZero,
          threeZero: req.body.threeZero,
          twoOne: req.body.twoOne,
          threeOne: req.body.threeOne,
          threeTwo: req.body.threeTwo,
          zeroOne: req.body.zeroOne,
          zeroTwo: req.body.zeroTwo,
          zeroThree: req.body.zeroThree,
          oneTwo: req.body.oneTwo,
          oneThree: req.body.oneThree,
          twoThree: req.body.twoThree,
          anyOther: req.body.anyOther,
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  }
}

export const oddController = new OddController();
