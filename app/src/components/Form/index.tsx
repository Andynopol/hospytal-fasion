import React from 'react';

import { FieldSelector, NoSrcAlert } from '../constants';
import { LOGIN_TYPE, REGISTER_TYPE, ADD_PRODUCT_TYPE, UPDATE_PRODUCT_TYPE } from '../constants';
import AddProductForm from './AddProductForm';
import UpdateProductForm from './UpdateProductForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface Props
{
    type: string;
    name?: string;
    description?: string;
    details?: string;
    promotion?: string | number;
    price?: number;
    pieces?: number;
    src?: string;
    removeImage?: () => void;
    change?: ( target: HTMLInputElement | HTMLTextAreaElement, id: FieldSelector, forced?: boolean ) => void;
    reset?: () => void;
    update?: ( ev: any ) => void;


    clear?: () => void;
    send?: ( ev: any ) => void;

    //fields checkers
    fieldWarnings?: { name: boolean, price: boolean, description: boolean; };
    checkFields?: () => boolean;

    //dialog props
    openDialog?: ( title: string, content: string ) => void;
}

const index = ( props: Props ) =>
{
    const { type } = props;
    if ( type === ADD_PRODUCT_TYPE )
    {
        const { name,
            description,
            details,
            promotion,
            price,
            pieces,
            src,
            change,
            clear,
            send,
            removeImage,
            fieldWarnings,
            checkFields,
            openDialog } = props;

        return (
            <AddProductForm
                name={ name }
                description={ description }
                details={ details }
                promotion={ promotion }
                price={ price }
                pieces={ pieces }
                src={ src }
                change={ change }
                clear={ clear }
                send={ send }
                removeImage={ removeImage }

                //fields checkers
                fieldWarnings={ fieldWarnings }
                checkFields={ checkFields }

                //dialog params
                openDialog={ openDialog }
            />
        );
    } else if ( type === UPDATE_PRODUCT_TYPE )
    {
        const { name,
            description,
            details,
            promotion,
            price,
            pieces,
            src,
            change,
            reset,
            update,
            removeImage,
            fieldWarnings,
            checkFields,
            openDialog } = props;
        return (
            <UpdateProductForm
                name={ name }
                description={ description }
                details={ details }
                promotion={ promotion }
                price={ price }
                pieces={ pieces }
                src={ src }
                removeImage={ removeImage }
                change={ change }
                reset={ reset }
                update={ update }
                fieldWarnings={ fieldWarnings }
                checkFields={ checkFields }
                openDialog={ openDialog }

            />
        );
    } else if ( type === LOGIN_TYPE )
    {
        return (
            <LoginForm />
        );
    }
    else if ( type === REGISTER_TYPE )
    {
        return (
            <RegisterForm />
        );
    }

};

export default index;
