const AdminModel = require("../models/Admin");
const BooksModel = require("../models/Books");
const {
  AdminValidation,
  BooksValidation,
  LoginValidation,
} = require("../validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  try {
    const { error } = AdminValidation(req.body);
    if (error) return res.json(error.details[0].message);
    const EmailExist = await AdminModel.findOne({ email: req.body.email });
    if (EmailExist)
      return res.json({ success: false, message: "Email Already Exist!" });
    const NameExist = await AdminModel.findOne({ name: req.body.name });
    if (NameExist)
      return res.json({ success: false, message: "Name Already Exist!" });
    if (req.body.password !== req.body.confirm_password)
      return res.json({ success: false, message: "Password Doesnot match!" });

    const createdModel = await AdminModel.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: "Admin registered successfully ! " });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { error } = LoginValidation(req.body);
    if (error) return res.json(error.details[0].message);

    const user = await AdminModel.findOne({ email: req.body.email });
    if (!user)
      return res.json({ success: false, message: "*Email doesnot exist" });

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.TOKEN_SECRET,
      { expiresIn: 604800 }
    );

    return res
      .status(201)
      .json({ success: true, token: token /*, expiresIn: expiry */ });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

exports.addBook = async (req, res) => {
  try {
    console.log(req.data);
    const { error } = BooksValidation(req.body);
    if (error)
      return res.json({ success: false, message: error.details[0].message });

    const createdModel = await BooksModel.create(req.body);
    if (createdModel)
      return res.status(201).json({ success: true, message: "Book Added" });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const book = await BooksModel.find();

    if (book) return res.status(201).json({ success: true, message: book });
    else return res.json({ success: false, message: "Book not Found" });
  } catch (err) {
    return res.json({ success: false, message: "Error: " + err });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await BooksModel.findById(req.params.id);

    if (book) return res.status(201).json({ success: true, message: book });
    else return res.json({ success: false, message: "Book not Found" });
  } catch (err) {
    return res.json({ success: false, message: "Error: " + err });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const book = await BooksModel.findByIdAndDelete(req.params.id);

    if (book)
      return res.status(201).json({ success: true, message: "Book Deleted" });
    else return res.json({ success: false, message: "Book Not Found" });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

exports.editBook = async (req, res) => {
  try {
    const book = await BooksModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          status: req.body.status,
        },
      }
    );

    if (book)
      return res.status(201).json({ success: true, message: "Book Updated" });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};
