import {Document} from "mongoose";

export interface User extends Document{
    
        readonly id: String;
        readonly name: String;
        readonly surname: String;
        readonly placeofbirth: String;
        readonly dateofbirth: String;
        readonly career: String;

}