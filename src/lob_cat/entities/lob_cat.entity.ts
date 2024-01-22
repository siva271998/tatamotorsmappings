import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity({
    name: "lob_cat"
})
export class LobCat {

    @ObjectIdColumn()
    id: string;

    @Column({
        name: "lobCategory"
    })
    lobCategory: string;
}
