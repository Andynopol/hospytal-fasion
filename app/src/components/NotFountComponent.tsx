import React, { useEffect } from 'react';

interface Props
{
    showNav: ( is: boolean ) => void;
}

//@the component that renders when you access an invalid route
const NotFountComponent: React.FC<Props> = ( props: Props ) =>
{
    const { showNav } = props;

    useEffect( () =>
    {
        showNav( false );
        return () =>
        {
            showNav( true );
        };
    }, [] );
    return (
        <>
            No page on this path!
        </>
    );
};

export default NotFountComponent;
