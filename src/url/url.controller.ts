import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('access_token')
@ApiTags('url')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiResponse({
    status: 200,
    description: 'Get success',
    schema: {
      example: [
        {
          createdAt: '2024-09-05T02:31:30.495Z',
          updatedAt: '2024-09-05T02:31:30.495Z',
          deletedAt: null,
          id: 'b3c52913-0e20-4e43-84b8-e362d546596f',
          hash: 'CEX15w',
          url_origin: 'http://google.com.br',
          requests: 0,
        },
        {
          createdAt: '2024-09-05T02:42:14.516Z',
          updatedAt: '2024-09-05T02:42:14.516Z',
          deletedAt: null,
          id: '2253bc85-936b-483d-a799-68ef4dcbc728',
          hash: 'fGgCX2',
          url_origin: 'http://google.com.br',
          requests: 2,
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        message: 'Unauthorized - Invalid or missing token',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiOperation({ summary: 'List URLs of the user' })
  @UseGuards(AuthGuard)
  @Get('all')
  async get(@Request() req) {
    return await this.urlService.findAll(req.user.sub);
  }

  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        message: 'Unauthorized - Invalid or missing token',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'URL shortened successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'url_origin should not be empty',
          'url_origin must be a valid URL',
          'url_origin must start with http or https',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiOperation({ summary: 'Shorten URL' })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createUrlDto: CreateUrlDto) {
    return await this.urlService.create(req.user?.sub, createUrlDto);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'URL ID',
  })
  @ApiResponse({
    status: 200,
    description: 'URL updated successfully',
    schema: {
      example: {
        message: 'URL updated successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'URL not found or you do not have permission to update it',
    schema: {
      example: {
        statusCode: 404,
        message: 'URL not found or you do not have permission to update it',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        message: 'Unauthorized - Invalid or missing token',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiOperation({ summary: 'Update URL' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
    @Request() req,
  ) {
    return this.urlService.update(req.user?.sub, id, updateUrlDto);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'URL ID',
  })
  @ApiResponse({
    status: 200,
    description: 'URL deleted successfully',
    schema: {
      example: {
        message: 'URL deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'URL not found or you do not have permission to delete it',
    schema: {
      example: {
        statusCode: 404,
        message: 'URL not found or you do not have permission to delete it',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        message: 'Unauthorized - Invalid or missing token',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiOperation({ summary: 'Delete URL' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.urlService.remove(req.user?.sub, id);
  }
}
