import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cliente, ClienteSchema } from '../schemas/cliente.schema';
import mongoose from 'mongoose';
import { ClienteDto } from '../dto/cliente.dto';
import { HttpResponse } from 'src/shared/interfaces/HttpResponse';

@Injectable()
export class ClientesService {

    constructor(
        @InjectModel(Cliente.name)
        private clienteModel: mongoose.Model<Cliente>
    ){}


    async create (cliente:ClienteDto):Promise<HttpResponse>{
        try{
            const existDocument = await this.existDocument(cliente);
            const existEmail = await this. existEmail(cliente);

            if( existDocument ){
                return {success: false,data: null, message:'Document already exist'} as HttpResponse;
            }

            if( existEmail ){
                return {success: false,data: null, message:'Email already exist'} as HttpResponse;
            }

            const clienteModel = await this.clienteModel.create(cliente);
            return { success: true, data: clienteModel } as HttpResponse;
        }catch(e){
            return { success: false, data: null, message: 'Not saved client'} as HttpResponse;
        }
    }

    async existDocument(cliente:ClienteDto):Promise<boolean>{
        const clienteModel = await this.clienteModel.findOne({ document:cliente.document }).exec();
        return clienteModel !== null;
    }

    async existEmail(cliente:ClienteDto):Promise<boolean>{
        const clienteModel = await this.clienteModel.findOne({ email:cliente.email }).exec();
        return clienteModel !== null;
    }
}
