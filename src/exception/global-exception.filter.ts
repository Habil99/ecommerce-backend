import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";
import { prismaClientQueryEngineErrorCodesMap } from "../static/primsa-client-query-engine";
import { getReasonPhrase } from "http-status-codes";
import { Prisma } from "@prisma/client";

const createResponseFactory = (statusCode: number) => (message: string) => ({
  statusCode,
  error: getReasonPhrase(statusCode),
  message,
  timestamp: new Date().toISOString(),
});

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const path = request.url;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const message = exception.message.replaceAll(/\n/g, "");
      const exceptionCode =
        exception.code as keyof typeof prismaClientQueryEngineErrorCodesMap;

      const statusCode =
        prismaClientQueryEngineErrorCodesMap[exceptionCode] ??
        HttpStatus.INTERNAL_SERVER_ERROR;

      response
        .status(statusCode)
        .json(createResponseFactory(statusCode)(message));
    }

    const statusCode = exception.code ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(statusCode)
      .json(createResponseFactory(statusCode)(exception.message));
  }
}
