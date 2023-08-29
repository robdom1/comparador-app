import React, { useCallback } from 'react';

function IconComponent(){
    const IconComponentCallback = useCallback((Icon, name, color, size)=>(
        <Icon 
            name={name}
            color={color}
            size={size}
        />
    ),[]);

    return IconComponentCallback;
}

export default IconComponent;
