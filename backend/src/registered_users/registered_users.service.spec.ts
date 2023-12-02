import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredUsersService } from './registered_users.service';

describe('RegisteredUsersService', () => {
  let service: RegisteredUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisteredUsersService],
    }).compile();

    service = module.get<RegisteredUsersService>(RegisteredUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
