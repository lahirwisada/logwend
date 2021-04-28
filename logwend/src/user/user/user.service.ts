import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/auth/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}

    create(user: User): Observable<User> {
        return this.authService.hasPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.password = passwordHash;
                newUser.role = user.role;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),catchError(err => throwError(err))
                )
            })
        )
        // return from(this.userRepository.save(user));
    }

    findOne(id: number): Observable<User>{
        return from(this.userRepository.findOne({id})).pipe(
            map((user: User) => {
                if (typeof user !== 'undefined') {
                    const {password, ...result} = user;
                    return result;
                }
                return user;
            })
        )
        // return from(this.userRepository.findOne(id));
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function(v) {delete v.password});
                return users;
            })
        );
    }

    deleteOne(id: number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any>{
        delete user.password;

        return from(this.userRepository.update(id, user));
    }

    updateRoleOfUser(id: number, user: User): Observable<any>{
        return from(this.userRepository.update(id, user));
    }

    login(user: User): Observable<string>{
        return this.validateUser(user.username, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'wrong Credentials';
                }
            })
        )
    }

    validateUser(username: string, password: string): Observable<User>{
        return this.findByUsername(username).pipe(
            switchMap((user: User) => this.authService.comparePassword(password,user.password).pipe(
                map((match: boolean) => {
                    if(match){
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        )
    }

    findByUsername(username: string): Observable<User>{
        return from(this.userRepository.findOne({username}));
    }
}
