import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Dummy {

    @ObjectIdColumn()
    id: string

    @Column()
    userId: string
    @Column()
    jobTitleName: string
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column()
    joiningdate: string
    @Column()
    finalSettelmentDate:string

}
