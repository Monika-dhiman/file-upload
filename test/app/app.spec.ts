import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/app.service';


describe('Test cases for AppHandler class', () => {
  let appHandler: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appHandler = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should return the correct string', () => {
      const result = appHandler.getHello();
      expect(result).toBe(
        'Firebase: File upload and delete service',
      );
    });
  });
});
