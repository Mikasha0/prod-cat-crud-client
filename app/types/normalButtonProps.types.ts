import { MouseEventHandler } from "react";

export interface NormalButtonProps {
    buttonName: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler;
}