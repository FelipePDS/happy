import { ErrorRequestHandler } from 'express';
import { ValidationErrors } from 'yup';

interface ValidateErrors {
    [Key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ValidationErrors) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors(err.path) = err.errors;
        })

        return response.status(400).json({ message: 'Validations Fails', errors });
    }
    console.error(error);

    return response.status(500).send( {message: 'Internal Server Error'});
};

export default errorHandler;