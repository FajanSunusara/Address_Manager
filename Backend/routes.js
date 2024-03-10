const express = require("express");

const router = express.Router();
const { ObjectId } = require("mongodb");
const { getConnectedClient } = require("./database");
const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("AddressDb").collection("Address");
  return collection;
};

router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const address = await collection.find({}).toArray();
  console.log(address);
  res.status(200).json(address);
});

router.post("/todos", async (req, res) => {
  const collection = getCollection();
  const { streetAddress,city,state,zipCode} = req.body;
  const newAdress = await collection.insertOne({streetAddress,city,state,zipCode });
  // console.log(req.body)
  res.status(201).json({ msg: "post request to /api/todos" });
});

router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const deletedTodo = await collection.deleteOne({ _id });
  res.status(200).json(deletedTodo);
});

router.put("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const { streetAddress, city, state, zipCode } = req.body;
  
  try {
      const updatedAddress = await collection.updateOne(
          { _id },
          {
              $set: {
                  streetAddress,
                  city,
                  state,
                  zipCode
              }
          }
      );
      res.status(200).json(updatedAddress);
  } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
router.get("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const address = await collection.findOne({ _id });
  console.log(address);
  res.status(200).json(address);
});

module.exports = router;
