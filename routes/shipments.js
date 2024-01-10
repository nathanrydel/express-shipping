"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");

const { shipProduct } = require("../shipItApi");
const orderSchema = require("../schemas/order.json");

/** POST /shipments
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  if (req.body === undefined) {
    throw new BadRequestError();
  }
  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;