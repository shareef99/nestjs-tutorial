import { Injectable } from "@nestjs/common";

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
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; email: string; role: "ADMIN" | "INTERN" }) {
    const { name, email, role } = user;
    const newUser = {
      id: this.users.sort((a, b) => b.id - a.id)[0].id + 1,
      name,
      email,
      role,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: { name?: string; email?: string; role?: "ADMIN" | "INTERN" },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id)
        return {
          ...user,
          ...updatedUser,
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
