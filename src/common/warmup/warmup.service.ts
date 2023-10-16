import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { tap, map, catchError, of } from 'rxjs';

@Injectable()
export class WarmupService implements OnApplicationBootstrap {
  readonly turnstileSyncEndpoint = 'https://turnstile.server.d0lim.com/internal/api/v1/service-endpoint';

  constructor(private readonly httpService: HttpService) {}

  onApplicationBootstrap() {
    const publicEndpoints = ['/api/v1/study/on-fire', '/api/v1/study'];
    const draftEndpoints = ['/api/v1/user'];
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
        catchError((err) =>
          of({
            data: `error occurred, ${err}`,
          }),
        ),
        tap((res) => console.log(res)),
        map((res) => res.data),
      )
      .subscribe();
  }
}
