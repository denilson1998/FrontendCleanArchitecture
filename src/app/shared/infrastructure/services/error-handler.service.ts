import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(private loggerService: LoggerService) {
    super();
  }

  override handleError(error: Error) {
    if (environment.production) {
      this.loggerService.logException(error); // Manually log exception
    } else {
      console.error(error);
    }
  }
}
