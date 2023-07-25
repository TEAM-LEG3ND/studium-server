import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { tap, map } from 'rxjs';

@Injectable()
export class WarmupService implements OnApplicationBootstrap {
  readonly turnstileSyncEndpoint = 'localhost:8080/api/test';

  constructor(private readonly httpService: HttpService) {}

  onApplicationBootstrap() {
    const publicEndpoints = ['/member/login'];

    this.httpService.post(this.turnstileSyncEndpoint, publicEndpoints).pipe(
      tap((res) => console.log(res)),
      map((res) => res.data),
    );
  }
}
