import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity({
    name: "client"
})
export class Client {
    @ObjectIdColumn()
    id: string;

    @Column({
        name: "insured_name"
    })
    insuredName: string;
}
