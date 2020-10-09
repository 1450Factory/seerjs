import mongoose, { PaginateModel, Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface I{{toPascalCase name}} extends Document {
  {{#each fields}}{{#if this.name}}{{this.name}}: {{toSnakeCase this.type}};{{/if}}{{/each}}
}

const {{toCamelCase name}}Schema: Schema = new Schema({
    {{#each fields}}{{#if this.name}}{{this.name}}: { type: {{this.type}} },{{/if}}{{/each}}
    deletedAt: Date
  },
  {
    collection: '{{toSnakeCase name}}s', 
    timestamps: true
  }
);

{{toCamelCase name}}Schema.plugin(mongoosePaginate);

interface {{toPascalCase name}}Model<T extends Document> extends PaginateModel<T> {}

// Export the model and return your I{{toPascalCase name}} interface
export default mongoose.model<I{{toPascalCase name}}>('{{toSnakeCase name}}s', {{toCamelCase name}}Schema) as {{toPascalCase name}}Model<I{{toPascalCase name}}>;
