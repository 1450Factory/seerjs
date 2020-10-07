const mongoose = require('mongoose')

const Schema = mongoose.Schema

const <%= name %>Schema = new Schema({
    <% fields.forEach(function(field){ %>
    <% if (field.name) { %>
    <%= field.name %>: { type: <%= field.type %> },
    <% } %>
    <% }); %>
    deletedAt: Date
  },
  {
    collection: '<%= name %>s', 
    timestamps: true
  }
)

module.exports = mongoose.model('<%= name %>s', <%= name %>Schema)
