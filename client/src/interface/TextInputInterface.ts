import { ChangeEvent } from "react";

export interface TextInputInterface{
    onChange:ChangeEvent<HTMLInputElement>|Function,
    value:String;
    placeholder:String;
    type:String;
    name:String;
}