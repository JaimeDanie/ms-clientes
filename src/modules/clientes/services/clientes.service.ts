import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cliente, ClienteSchema } from '../schemas/cliente.schema';
import mongoose from 'mongoose';
import { ClienteDto } from '../dto/cliente.dto';
import { HttpResponse } from 'src/shared/interfaces/HttpResponse';
import { OrderTypeEnum } from 'src/shared/Enums/OrderType.enum';
import { DateUtils } from 'src/shared/utils/dateUtils';

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

    async obtainAlphabeticClients(order:OrderTypeEnum):Promise<HttpResponse>{
       const clients = await this.clienteModel.find().sort({ fullName:order === OrderTypeEnum.ASC?1:-1 });
       return { success:true, data: clients}
    }

    async obtainByAgeClients(order:OrderTypeEnum):Promise<HttpResponse>{
        const clientsAge = await this.obtainClientsAge();
        const clientsAgeSort = order === OrderTypeEnum.ASC?
        clientsAge.sort((a,b)=>a.age-b.age): clientsAge.sort((a,b)=>b.age-a.age)
        return { success:true, data: clientsAgeSort}
     }

     async obtainMetricsClients():Promise<HttpResponse>{
        const clientsAge = await this.obtainClientsAge();
        return { success:true, data: {totalClients: clientsAge.length, average: this.averageEdad(clientsAge)}}
     }
  
     async obtainClientsAge(){
        const clients = await this.clienteModel.find();
        const clientsAge = clients.map((client)=>({
            fullName: client.fullName,
            age: this.obtainAge(client)
        }));
        return clientsAge;
     }

    async existDocument(cliente:ClienteDto):Promise<boolean>{
        const clienteModel = await this.clienteModel.findOne({ document:cliente.document }).exec();
        return clienteModel !== null;
    }

    async existEmail(cliente:ClienteDto):Promise<boolean>{
        const clienteModel = await this.clienteModel.findOne({ email:cliente.email }).exec();
        return clienteModel !== null;
    }


    obtainAge( client:Cliente):number {

        const hoy = DateUtils.dateNow();
        const nacimiento = new Date(client.birthdate);
        let age = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
          age--;
        }
        
        return age;
    }

    averageEdad( clientsAge:{fullName:string,age:number}[]):number{
        let totalAge = 0;
        clientsAge.forEach((client)=>{
            totalAge += client.age
        });
        return totalAge/clientsAge.length
    }
}
