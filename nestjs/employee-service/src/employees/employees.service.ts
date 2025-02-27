import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {

    public greetings(): String{
        const message: string ="Hello From Employee!";
        return message;
    }
}
