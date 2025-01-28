import { Module } from '@nestjs/common';
import { ClientesController } from './controller/clientes.controller';
import { ClientesService } from './services/clientes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteSchema } from './schemas/cliente.schema';



@Module({
  imports: [
    MongooseModule.forFeature([ { name:'Cliente',schema: ClienteSchema } ])
  ],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
