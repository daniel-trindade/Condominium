import { PartialType } from "@nestjs/swagger";
import { CreatePorteiroDto } from "./create-porteiro.dto";

export class UpdatePorteiroDto extends PartialType(CreatePorteiroDto){
 
}
