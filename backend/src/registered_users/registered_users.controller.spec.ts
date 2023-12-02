import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredUsersController } from './registered_users.controller';
import { RegisteredUsersService } from './registered_users.service';

describe('RegisteredUsersController', () => {
  let controller: RegisteredUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisteredUsersController],
      providers: [RegisteredUsersService],
    }).compile();

    controller = module.get<RegisteredUsersController>(RegisteredUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
