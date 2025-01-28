import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
    versionKey: false
})
export class Cliente{

    @Prop()
    fullName: string;

    @Prop()
    document: string;

    @Prop()
    email: string;

    @Prop()
    birthdate: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente)