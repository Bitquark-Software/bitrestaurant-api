import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsString, IsEmail, IsNotEmpty,IsDate, IsEnum} from 'class-validator';

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'the name', example: 'azalia'})
    readonly name:String;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The last name of the user', example: 'Gonzalez' })
    readonly apellido: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The password of the user', example: 'mysecretpassword' })
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['superadmin', 'admin', 'user'])
    @ApiProperty({ description: 'The role of the user', example: 'user' })
    readonly role: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: 'The date of birth of the user', example: '1990-01-01' })
    readonly fechaDeNacimiento: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The phone number of the user', example: '1234567890' })
    readonly telefono: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The RFC of the user', example: 'ABC123456XYZ' })
    readonly rfc: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['facebook', 'instagram', 'sitio web', 'recomendacion', 'otro'])
    @ApiProperty({ description: 'The original source of the user', example: 'facebook' })
    readonly fuenteOriginal: string;


}
