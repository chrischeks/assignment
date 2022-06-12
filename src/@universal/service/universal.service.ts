import IResponse from '@/@universal/interfaces/response.interface';

class UniversalService {
  public successResponse = (message = 'success', data = null): IResponse<any, string> => {
    return { statusCode: 200, status: true, message, data };
  };

  public failureResponse = (message: string, data = null): IResponse<any, string> => {
    return { statusCode: 400, status: false, message, data };
  };

  public generateRandom(length: number): string {
    const dict = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';

    let result = '';
    for (let i = length; i > 0; i -= 1) {
      result += dict[Math.round(Math.random() * (dict.length - 1))];
    }
    return result;
  }
}
export default UniversalService;
