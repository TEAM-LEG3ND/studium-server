import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { tap, map } from 'rxjs';

@Injectable()
export class WarmupService implements OnApplicationBootstrap {
  readonly turnstileSyncEndpoint = 'https://api.server.d0lim.com/turnstile/internal/api/v1/service-endpoint';

  constructor(private readonly httpService: HttpService) {}

  onApplicationBootstrap() {
    const publicEndpoints = ['/test/public'];
    const draftEndpoints = ['/test/draft'];
    const basePath = '/studium';

    const requestBody = {
      base_path: basePath,
      draft_endpoints: draftEndpoints,
      type: 'STUDIUM',
      public_endpoints: publicEndpoints,
    };

    this.httpService
      .post(this.turnstileSyncEndpoint, requestBody)
      .pipe(
        tap((res) => console.log(res)),
        map((res) => res.data),
      )
      .subscribe();
  }
}
