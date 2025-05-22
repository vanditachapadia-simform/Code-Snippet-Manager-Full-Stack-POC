import { Injectable } from '@nestjs/common';
import { PrismaClient, Snippet } from '@prisma/client';
import { CreateSnippetDto, UpdateSnippetDto } from './snippet.dto';

@Injectable()
export class SnippetService {
  private prisma = new PrismaClient();

  async create(data: CreateSnippetDto): Promise<Snippet> {
    return this.prisma.snippet.create({ data });
  }

  async findAll(): Promise<Snippet[]> {
    return this.prisma.snippet.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: number): Promise<Snippet | null> {
    return this.prisma.snippet.findFirst({ where: { id, deletedAt: null } });
  }

  async update(id: number, data: UpdateSnippetDto): Promise<Snippet> {
    return this.prisma.snippet.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Snippet> {
    // Soft delete: set deletedAt to now
    return this.prisma.snippet.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
