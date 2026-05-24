import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authTokenInterceptor } from './core/interceptors/authToken.interceptor'
import { provideNgxMask } from 'ngx-mask'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxMask(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
  ],
}
