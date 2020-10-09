const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const {{toCamelCase name}}Schema = new Schema({
    {{#each fields}}{{#if this.name}}{{this.name}}: { type: {{this.type}} },{{/if}}{{/each}}
    deletedAt: Date
  },
  {
    collection: '{{toSnakeCase name}}s', 
    timestamps: true
  }
)

{{toCamelCase name}}Schema.plugin(mongoosePaginate)
module.exports = mongoose.model('{{toSnakeCase name}}s', {{toCamelCase name}}Schema)
