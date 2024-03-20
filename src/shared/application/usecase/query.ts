import { UseCase } from './use-case'

export interface Query<Request, Response = void> extends UseCase<Request, Response> {}
