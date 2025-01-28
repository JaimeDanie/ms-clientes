import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { OrderTypeEnum } from "src/shared/Enums/OrderType.enum";

export class QueryDto{
    @ApiProperty({
        description: 'Order alphabetic',
        enum: OrderTypeEnum,
        enumName: 'Order',
    })
    @IsEnum(OrderTypeEnum)
    order:OrderTypeEnum
}