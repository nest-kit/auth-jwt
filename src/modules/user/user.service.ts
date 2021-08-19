import { Injectable } from '@nestjs/common';

/**
 * 声明用户实体
 */
export interface UserEntity {
  // 用户名
  username: string;
  // 密码
  password: string;
}

/**
 * 用来获取用户以及对应的信息
 * 本案例未连接任何数据源，写死了数据
 */
@Injectable()
export class UserService {
  static Users: UserEntity[] = [
    {
      username: 'user1',
      password: '123456',
    },
    {
      username: 'user2',
      password: '321321',
    },
    {
      username: 'user3',
      password: 'aabbcc',
    },
  ];

  /**
   * 根据用户名返回一个用户
   * @param username
   */
  loginUser(username: string): UserEntity | undefined {
    return UserService.Users.find((user) => user.username === username);
  }

  /**
   * 根据用户名返回一个用户
   *
   * 模拟异步情况
   *
   * @param username
   */
  loginUserAsync(username: string): Promise<UserEntity | undefined> {
    return new Promise<UserEntity | undefined>((resolve) => {
      const findUser = UserService.Users.find(
        (user) => user.username === username,
      );

      // 延迟1秒
      setTimeout(() => {
        // 返回用户信息
        resolve(findUser);
      }, 1000);
    });
  }
}
