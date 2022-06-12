interface IResponse<T, K> {
  status: boolean;
  message: K;
  data?: T;
  statusCode: number;
}
export default IResponse;
