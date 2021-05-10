import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, } from '@nestjs/common';
import { UserService } from './user.service';


import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        try {
            const user = await this.userService.createUser(createUserDTO);
            return res.status(HttpStatus.OK).json({
                message: "Usuario agregado",
                user
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e.console.errors.name.message });
        }
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users)
    }

    @Get('/:userID')
    async getUserById(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (userID.length !== 24)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe' });
        if (!user) throw new NotFoundException('No existe el usuario');
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:userID')
    async deleteUser(@Res() res, @Param('userID') userID) {
        const userDeleted = await this.userService.deleteUser(userID);
        if (userID.length !== 24)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe el usuario' });
        if (!userDeleted) throw new NotFoundException('No existe el usuario');
        return res.status(HttpStatus.OK).json({
            message: 'Usuario eliminado',
            userDeleted
        });
    }
    
    @Put('/:userID')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Param('userID') userID) {
        const userUpdated = await this.userService.updateUser(userID, createUserDTO);
        if (userID.length !== 24)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe el usuario' });
        if (!userUpdated) throw new NotFoundException('No existe el usuario');
        return res.status(HttpStatus.OK).json({
            message: 'Usuario actualizado',
            userUpdated
        });
    }
}
