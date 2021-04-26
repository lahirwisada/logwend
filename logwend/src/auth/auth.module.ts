import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
    imports:[
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('AUTHSEC'),
                signOptions: {expiresIn: '900s'}
            })
        })
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
