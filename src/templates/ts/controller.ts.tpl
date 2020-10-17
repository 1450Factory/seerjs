import { PaginateResult } from 'mongoose';
import { Request, Response } from 'express';
import {{toPascalCase name}}s, { I{{toPascalCase name}} } from '../models/{{toPascalCase name}}s.model';

function getAll (req: Request, res: Response) {
  const page = (typeof req.query.page === 'string')
    ? parseInt(req.query.page) : 1
  const limit = (typeof req.query.limit === 'string')
    ? parseInt(req.query.limit) : 10
  const sort = { createdAt: (req.query.createdAt === 'asc') ? 'asc' : -1 }

  {{toPascalCase name}}s.paginate({}, { limit, page, sort })
    .then((data: PaginateResult<I{{toPascalCase name}}>) => res.status(200).json({
      status: 'OK',
      totalPages: data.totalPages,
      limit: data.limit,
      page: data.page,
      data: data.docs
    }))
    .catch((error: Error) => res.status(500).json({
      status: 'ERROR',
      data: error
    }))
}

function getById (req: Request, res: Response) {
  {{toPascalCase name}}s.findById(req.params.id)
    .then((data: I{{toPascalCase name}}) => res.status(200).json({
      status: 'OK',
      data
    }))
    .catch((error: Error) => res.status(500).json({
      status: 'ERROR',
      data: error
    }))
}

function create (req: Request, res: Response) {
  const {{toPascalCase name}} = new {{toPascalCase name}}s(req.body)

  {{toPascalCase name}}.save()
    .then((data: I{{toPascalCase name}}) => res.status(201).json({
      status: 'OK',
    }))
    .catch((error: Error) => res.status(500).json({
      status: 'ERROR',
      data: error
    }))
}

function updateById (req: Request, res: Response) {
  {{toPascalCase name}}s
    .findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((data: I{{toPascalCase name}}) => res.status(200).json({
      status: 'OK',
      data
    }))
    .catch((error: Error) => res.status(500).json({
      status: 'ERROR',
      data: error
    }))
}

function deleteById (req: Request, res: Response) {
  {{toPascalCase name}}s.findByIdAndRemove(req.params.id)
    .then((data: I{{toPascalCase name}}) => res.status(204).json({}))
    .catch((error: Error) => res.status(500).json({
      status: 'ERROR',
      data: error
    }))
}

export default { getAll, getById, create, updateById, deleteById };
