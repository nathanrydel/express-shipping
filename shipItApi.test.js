"use strict";

const fetchMock = require("fetch-mock");

const {
  shipProduct,
  SHIPIT_SHIP_URL,
  SHIPIT_API_KEY
} = require("./shipItApi");


test("shipProduct", async function () {
  fetchMock.post(
    // {
    //   url: SHIPIT_SHIP_URL,
    //   body: {productId: 1000,
    //     name: "Test Tester",
    //     addr: "100 Test St",
    //     zip: "12345-6789",
    //     key: SHIPIT_API_KEY}
    // }
    SHIPIT_SHIP_URL,
   {
    receipt:
    {
      shipId: 42
    }
  });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(42);
});

afterAll(function () {
  fetchMock.reset();
});