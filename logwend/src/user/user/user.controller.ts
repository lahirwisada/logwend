import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from './models/user.interface';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){

    }

    @Post()
    create(@Body()user: User): Observable<User | Object>{
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Observable<User>{
        return this.userService.findOne(id);
    }

    @Get('/:id/:username')
    findUsername(@Param('id') id: number, @Param('username') username: string): Observable<User>{
        return this.userService.findByUsername(username);
    }

    @Get()
    findAll(): Observable<User[]>{
        return this.userService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<User>{
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string, @Body() user: User): Observable<any>{
        return this.userService.updateOne(Number(id), user);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User>{
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}
