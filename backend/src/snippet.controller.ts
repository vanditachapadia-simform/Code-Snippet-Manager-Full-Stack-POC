import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto, UpdateSnippetDto } from './snippet.dto';

@ApiTags('snippets')
@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Snippet created.' })
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetService.create(createSnippetDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all snippets.' })
  findAll() {
    return this.snippetService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a snippet by id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.snippetService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update a snippet.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a snippet.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.snippetService.remove(id);
  }
}
