import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity({
    name: "insurer"
})
export class Insurer {
    
    @ObjectIdColumn()
    id: string;

    @Column({
        name: "insurer_name"
    })
    insurerName: string;
}
