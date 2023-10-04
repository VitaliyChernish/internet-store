const { Visits } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class VisitController {
  async addVisits(req, res, next) {
    try {
      const {ip} = req.body;
      console.log('IP:', ip)
      const userAgent = req.get('User-Agent');
      
      const visit = await Visits.create({
        ip,
        userAgent
      });

      res.json(visit);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAllVisits(req, res) {
    const visit = await Visits.findAll();
    return res.json(visit);
  }
}

module.exports = new VisitController();