import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-use.dto";

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
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
