export class APIResponse {
    static success<T>(data: T, message = 'Success') {
        return {
            status: 'success',
            message,
            data,
        };
    }

    static error(message = 'Something went wrong', statusCode = 500) {
        return {
            status: 'error',
            message,
            statusCode,
        };
    }

    static notFound(message = 'Data not found') {
        return {
            status: 'fail',
            message,
            statusCode: 404,
        };
    }

    static badRequest(message = 'Bad request') {
        return {
            status: 'fail',
            message,
            statusCode: 400,
        };
    }
}
  