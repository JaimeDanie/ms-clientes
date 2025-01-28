import { Body, Controller, Post } from '@nestjs/common';
import { HttpResponse } from 'src/shared/interfaces/HttpResponse';
import { ClientesService } from '../services/clientes.service';
import { ClienteDto } from '../dto/cliente.dto';

@Controller('clientes')
export class ClientesController {

    constructor(private clientesService: ClientesService){}

    @Post()
    async create(@Body() cliente: ClienteDto) :Promise<HttpResponse>{
        return this.clientesService.create(cliente)
    }
}
