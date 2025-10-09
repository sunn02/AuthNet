import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class User {
  @PrimaryGeneratedColumn() 
    id: number;

  @Column() 
    name: string;

    @Column()
    password: string;    
    
    
  @Column({ unique: true })
    email: string;    
    
    @Column()
    phoneNo: string;

    @Column()
    role: string; // e.g., 'admin', 'user', etc.
}