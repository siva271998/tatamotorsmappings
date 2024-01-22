import { Module } from '@nestjs/common';
import { MapperServiceService } from './mapper_service.service';
import { MapperServiceController } from './mapper_service.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { InsurerModule } from 'src/insurer/insurer.module';
import { LobCatModule } from 'src/lob_cat/lob_cat.module';
import { PoliciesModule } from 'src/policies/policies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobCat } from 'src/lob_cat/entities/lob_cat.entity';
import { ClaimsModule } from 'src/claims/claims.module';

@Module({
  imports: [TypeOrmModule.forFeature([LobCat]),
    ClientsModule,
    InsurerModule,
    LobCatModule,
    PoliciesModule,
    ClaimsModule],
  controllers: [MapperServiceController],
  providers: [MapperServiceService],
})
export class MapperServiceModule { }
