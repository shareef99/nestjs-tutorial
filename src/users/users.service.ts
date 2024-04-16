import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-use.dto";

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: "Nadeem Shareef",
      email: "1nGpD@example.com",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Shareef Bhai",
      email: "sb@example.com",
      role: "INTERN",
    },
    {
      id: 3,
      name: "Nadeem Bhai",
      email: "nb@example.com",
      role: "ADMIN",
    },
    {
      id: 4,
      name: "MN Shareef",
      email: "mns@example.com",
      role: "ADMIN",
    },
    {
      id: 5,
      name: "Nadeem Set",
      email: "ns@example.com",
      role: "ADMIN",
    },
  ];

  findAll(role?: "ADMIN" | "INTERN") {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const { name, email, role } = createUserDto;
    const newUser = {
      id: this.users.sort((a, b) => b.id - a.id)[0].id + 1,
      name,
      email,
      role,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id)
        return {
          ...user,
          ...updatedUserDto,
        };
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
