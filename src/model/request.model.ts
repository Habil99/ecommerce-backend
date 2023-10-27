export interface SessionRequest extends Request {
  user: {
    userId: number;
  };
}
