const {{toPascalCase name}} = require("../models/{{toPascalCase name}}.model");

let {{toCamelCase name}}sController = {};

{{toCamelCase name}}sController.getAll = function (req, res) {
  const options = req.query

  const page = parseInt(options.page) || 1
  const limit = parseInt(options.limit) || 10
  const sort = { createdAt: (options.createdAt === 'asc') ? 'asc' : -1 }
  const payload = {}

  {{toPascalCase name}}.paginate(payload, { limit, page, sort })
    .then(({{toCamelCase name}}s) => {
      return res
        .status(200)
        .json({
          status: 'OK',
          totalPages: {{toCamelCase name}}s.totalPages,
          limit: {{toCamelCase name}}s.limit,
          page: {{toCamelCase name}}s.page,
          data: {{toCamelCase name}}s.docs
        })
    })
    .catch((error) => {
      return res
        .status(500)
        .json({
          status: 'ERROR',
          error: error
        })
    })
}

{{toCamelCase name}}sController.get = function (req, res) {
  {{toPascalCase name}}
    .findById(req.params.id)
    .then((doc) => {
      return res
        .status(200)
        .json({
          status: 'OK',
          data: doc
        })
    })
    .catch((err) => {
      return res
        .status(500)
        .json({
          status: 'ERROR',
          data: err
        })
    })
}

{{toCamelCase name}}sController.find = function (req, res) {
  const key = req.params.key
  const value = req.params.value
  const payload = {}

  payload[key] = value

  {{toPascalCase name}}
    .findOne(payload)
    .then((doc) => {
      return res
        .status(200)
        .json({
          status: 'OK',
          data: doc
        })
    })
    .catch((err) => {
      return res
        .status(500)
        .json({
          status: 'ERROR',
          data: err
        })
    })
}

{{toCamelCase name}}sController.create = function (req, res) {
  const {{toPascalCase name}} = new {{toPascalCase name}}(req.body)

  {{toPascalCase name}}
    .save()
    .then(async (created{{toPascalCase name}}) => {
      return res
        .status(201)
        .json({
          status: 'OK',
        })
    })
    .catch((err) => {
      return res
        .status(500)
        .json({
          status: 'ERROR',
          data: err
        })
    })
}

{{toCamelCase name}}sController.update = function (req, res) {
  const { id } = req.params

  {{toPascalCase name}}
    .findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((doc) => {
      res
        .status(200)
        .json({
          status: 'OK',
          data: doc
        })
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          status: 'ERROR',
          data: err
        })
    })
}

{{toCamelCase name}}sController.delete = function (req, res) {
  const { id } = req.params

  {{toPascalCase name}}
    .findByIdAndRemove(id)
    .then((doc) => {
      res
        .status(204)
        .json({})
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          status: 'ERROR',
          data: err
        })
    })
}

module.exports = {{toCamelCase name}}sController;
