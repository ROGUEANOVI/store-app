import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorResposneInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn)  => next(req).pipe(
  catchError(handlerErrorResponse)
)

function handlerErrorResponse(error: HttpErrorResponse): ReturnType<typeof throwError> {
  const errorResponse = `Error Code: ${error.status}, Message: ${error.message}`;
  return throwError(() => errorResponse);
}
