import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/user/user/models/user.interface";
import { UserService } from "src/user/user/user.service";
import { hasRoles } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private userService: UserService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if(!roles){
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user.user;

    return this.userService.findOne(user.id).pipe(
      map((foundUser: User) => {
        const hasRole = () => roles.indexOf(foundUser.role) > -1;
        let hasPermission: boolean = false;

        if(hasRole()) {hasPermission = true;}
        return foundUser && hasPermission;
      })
    )

  }
}