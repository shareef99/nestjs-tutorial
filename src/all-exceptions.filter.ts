import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { MyLoggerService } from "src/my-logger/my-logger.service";

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: "",
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
      myResponseObj.response = exception.message.replaceAll(/\n/g, "");
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = "Internal Server Error";
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);
    this.logger.error(myResponseObj.response, AllExceptionFilter.name);

    super.catch(exception, host);
  }
}
