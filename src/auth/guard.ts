import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Access Denied! Unauthorized User');
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token...');
    }
  }

  private extractJwtFromHeader(request): string | null {
    const authHeader = request.headers['authorization'];
    if (authHeader) {
      const bearerToken = authHeader.split(' ')[1];
      return bearerToken;
    }
    return null;
  }
}
