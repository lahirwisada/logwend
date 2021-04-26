import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    generateJWT(payload: Object):Observable <string>{
        return from(this.jwtService.signAsync({user: payload}));
    }

    hasPassword(password: string):Observable <string>{
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePassword(newPassword: string, passwordHash: string):Observable <any | boolean>{
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
