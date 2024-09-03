
const model = require("../models/models.js");

async function createCategories(req, res) {
  try {
    const Create = new model.Categories({
      type: "Expense",
      color: "#FCBE44",

    });

    await Create.save();

    // If successful, return the created category as a JSON response
    return res.json(Create);
  } catch (err) {
    // If there's an error, return a 400 status with an error message
    return res
      .status(400)
      .json({ message: `Error While Creating Categories: ${err.message}` });
  }
}
async function getCategories(req, res) {
  try {
    let data = await model.Categories.find({});

    let filter = data.map((value) => {
      return { type: value.type, color: value.color };
    });
    return res.json(filter);
  } catch (err) {
    res.json
      .status(500)
      .json({ message: "Error 500 Bad Gateway from controller", err });
  }
}
async function Create_Transaction(req, res) {
  try {
    // Check if req.body is empty
    if (
      !req.body ||
      !req.body.name ||
      !req.body.type ||
      typeof req.body.amount !== "number"
    ) {
      return res.status(400).json({
        message: "Invalid input data: Name, type, and amount are required.",
      });
    }

    let { name, type, amount } = req.body;
    const create = new model.Transaction({
      name,
      type,
      amount,
    });

    await create.save();
    return res.status(201).json(create);
  } catch (error) {
    // error
    return res.status(500).json({ message: "Error" });
  }
}
async function get_Transaction(req, res) {
  try {
    let data = await model.Transaction.find({});
    return res.json(data);
  } catch (err) {
    res.json
      .status(500)
      .json({ message: "Error 500 Bad Gateway from controller", err });
  }
}
async function delete_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Request body Not Found");

  let result = await model.Transaction.deleteOne({ _id: req.body }).clone();
  try {
    if (result.deletedCount === 0) {
      return res.status(404).json("No matching record found to delete");
    }

    // If a document was deleted, send a success response
    return res.status(200).json("Record deleted successfully");
  } catch (err) {
    // Handle any other errors that occur during the operation
    return res.status(500).json("Error while deleting", err);
  }
}

async function get_labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((value) => ({
        _id: value._id,
        name: value.name,
        type: value.type,
        amount: value.amount,
        color: value.categories_info["color"],
      }));
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).res.json({ message: "Error agya yar", err: err.message });
    });
}

module.exports = {
  createCategories,
  getCategories,
  createCategories,
  Create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_labels,
};
