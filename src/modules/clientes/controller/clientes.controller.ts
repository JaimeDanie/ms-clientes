import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HttpResponse } from 'src/shared/interfaces/HttpResponse';
import { ClientesService } from '../services/clientes.service';
import { ClienteDto } from '../dto/cliente.dto';
import { OrderTypeEnum } from 'src/shared/Enums/OrderType.enum';
import { QueryDto } from '../dto/query.dto';

@Controller('clientes')
export class ClientesController {

    constructor(private clientesService: ClientesService){}

    @Post()
    async create(@Body() cliente: ClienteDto) :Promise<HttpResponse>{
        return this.clientesService.create(cliente)
    }

    @Get('alphabeticClient')
    async getAll(@Query() query: QueryDto) :Promise<HttpResponse>{
        const orderType = !query?OrderTypeEnum.ASC : query.order;
        return this.clientesService.obtainAlphabeticClients(orderType);
    }

    @Get('byAge')
    async getAllByAge(@Query() query: QueryDto) :Promise<HttpResponse>{
        const orderType = !query?OrderTypeEnum.ASC : query.order;
        return this.clientesService.obtainByAgeClients(orderType);
    }
}
