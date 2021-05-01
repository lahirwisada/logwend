import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BaseEntity } from "./base.entity";
import { IBaseService } from './IBase.service'

export class BaseController<T extends BaseEntity>{
    constructor(private readonly IBaseService: IBaseService<T>) {}

    @Get()
	findAll(): Promise<T[]> {
	  return this.IBaseService.getAll()
	}

    @Get(':id')
	findOne(@Param('id') id: string): Promise<T> {
	  return this.IBaseService.get(Number(id))
	}

    @Post()
	create(@Body() entity: T): Promise<number> {
		return this.IBaseService.create(entity);
	}

    @Delete(':id')
	deleteOne(@Param('id') id: string) {
	  this.IBaseService.delete(Number(id));
	}

	@Put(':id')
	updateOne(@Param('id')id: string, @Body() entity: T): Promise<T> {
	  return this.IBaseService.update(Number(id), entity);
	}
}