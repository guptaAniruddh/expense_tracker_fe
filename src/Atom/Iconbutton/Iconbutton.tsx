import { IconButton } from "rsuite";
import  {iconButtonProps} from "./button";
import React from "react";
const Iconbutton = ({icon,appearance,color ,size,children,handleClick}:iconButtonProps) => {
    const handleIconButton = React.useCallback(()=>{
        handleClick && handleClick();
    },[handleClick]);  
    return (
        <>
            <IconButton  icon = {icon} 
            appearance={appearance?appearance:"default"}
             onClick={handleIconButton}
            color={color}
            children={children}
            
             ></IconButton>
        </>
    )
}
export default Iconbutton;


