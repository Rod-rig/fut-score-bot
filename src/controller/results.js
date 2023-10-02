import prisma from "../utils/prisma.js";

class ResultsController {
  async createResults(req, res) {
    try {
      await prisma.results.create({
        data: {
          userId: parseInt(req.params.id),
          total: parseInt(req.body.total),
          england: parseInt(req.body.england),
          spain: parseInt(req.body.spain),
          germany: parseInt(req.body.germany),
          france: parseInt(req.body.france),
          italy: parseInt(req.body.italy),
          international: parseInt(req.body.international),
          prevMatchday: parseInt(req.body.prevMatchday),
          euroCups: parseInt(req.body.euroCups),
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
