import Icon from "@rsuite/icons/lib/Icon";
import React from "react";
import { TypeAttributes } from "rsuite/esm/@types/common";
import { EnumDeclaration } from "typescript";
import { IconButton } from "rsuite";

export interface iconButtonProps {
    icon:React.Element<typeof Icon>,
    handleClick?:Function,
    appearance?:TypeAttributes.Appearance
    color?:TypeAttributes.Color
    size?:string,
    children?:React.ReactNode


}
