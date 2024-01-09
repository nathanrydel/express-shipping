"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("invalid request - missing addr and zip", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: "Test McTest"
      }); //could add more things that go wrong in different ways to this test

    expect(resp.status).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance requires property \"addr\"",
       "instance requires property \"zip\""]);
  });
});
