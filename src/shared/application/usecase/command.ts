import { UseCase } from './use-case'

export interface Command<Response = void, Request = void> extends UseCase<Request, Response> {}
