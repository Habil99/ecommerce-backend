import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { Response } from "express";
import { prismaClientQueryEngineErrorCodesMap } from "../static/primsa-client-query-engine";
import { getReasonPhrase } from "http-status-codes";

@Catch()
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const path = request.url;
    const message = exception.message.replaceAll(/\n/g, "");
    const exceptionCode =
      exception.code as keyof typeof prismaClientQueryEngineErrorCodesMap;

    const statusCode =
      prismaClientQueryEngineErrorCodesMap[exceptionCode] ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      statusCode,
      error: getReasonPhrase(statusCode),
      message,
      path,
      timestamp: new Date().toISOString(),
    });
  }
}
