import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * GET /users
   * GET /users/:id
   * POST /users
   * PATCH /users/:id
   * DELETE /users/:id
   */

  @Get()
  findAll(@Query("role") role?: "INTERN" | "ADMIN") {
    return this.userService.findAll(role);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  create(
    @Body() user: { name: string; email: string; role: "ADMIN" | "INTERN" },
  ) {
    return this.userService.create(user);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() user: { name?: string; email?: string; role?: "ADMIN" | "INTERN" },
  ) {
    return this.userService.update(+id, user);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.userService.delete(+id);
  }
}
