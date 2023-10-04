import prisma from "../utils/prisma.js";

class ResultsController {
  async getResults(req, res) {
    const result = await prisma.results.findUnique({
      where: {
        userId: parseInt(req.params.id),
      },
    });
    res.json(result);
  }

  async updateResults(req, res) {
    try {
      await prisma.results.update({
        where: {
          userId: parseInt(req.params.id),
        },
        data: {
          total: +req.body.total,
          england: +req.body.england,
          spain: +req.body.spain,
          germany: +req.body.germany,
          france: +req.body.france,
          italy: +req.body.italy,
          international: +req.body.international,
          prevMatchday: +req.body.prevMatchday,
          euroCups: +req.body.euroCups,
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  }
}

export const resultsController = new ResultsController();
