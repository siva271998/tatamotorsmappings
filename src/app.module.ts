import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliciesModule } from './policies/policies.module';
import { ClientsModule } from './clients/clients.module';
import { InsurerModule } from './insurer/insurer.module';
import { LobCatModule } from './lob_cat/lob_cat.module';
import { MapperServiceModule } from './mapper_service/mapper_service.module';
import { ClaimsModule } from './claims/claims.module';
import { DummyModule } from './dummy/dummy.module';

// mongodb+srv://sivakumar:adminadmin@cluster0.t8unvzg.mongodb.net/
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      url: "mongodb+srv://sivakumar:adminadmin@cluster0.t8unvzg.mongodb.net/",
      useNewUrlParser: true,
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ],
      entityPrefix: 'tata_',
      synchronize: true,
      logging: true,
    }),
    PoliciesModule,
    ClientsModule,
    InsurerModule,
    LobCatModule,
    MapperServiceModule,
    ClaimsModule,
    DummyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
