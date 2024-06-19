import { Exclude } from 'class-transformer';
import { Column, BeforeInsert, Entity, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @Column({ type: 'varchar', length: 45, name: 'apellido' })
    apellido: string;

    @Exclude()
    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: ['superadmin', 'admin', 'user'] })
    role: string;

    @Column({ type: 'date', name: 'fecha_de_nacimiento' })
    fechaDeNacimiento: Date;

    @Column({ type: 'varchar', length: 15 })
    telefono: string;

    @Column({ type: 'varchar', length: 13 })
    rfc: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'enum', enum: ['facebook', 'instagram', 'sitio web', 'recomendacion', 'otro'], name: 'fuente_original' })
    fuenteOriginal: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 8);
            } catch (error) {
                console.error('Error hashing password:', error);
            }
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            console.error('Error comparing password:', error);
            return false; 
        }
    }
}
