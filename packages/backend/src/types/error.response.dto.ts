import { ApiSchema } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@ApiSchema({ name: 'ErrorResponse' })
export class ErrorResponseDto {
  @Expose()
  error: string;

  @Expose()
  message: string;

  @Expose()
  statusCode: number;

  constructor(statusCode: number) {
    this.statusCode = statusCode;
  }
}
