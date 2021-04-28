
//action types
export const SHOW = 'SHOW';
export const HIDE = 'HIDE';

enum SnackBarVariants
{
    success = 'success',
    fail = 'error',
    warning = 'warning',
    info = 'info',
}


//product request messages

export type snackVariant = "error" | "warning" | "info" | "success";

enum AddProductMessages
{
    success = "The product was added succesfully!",
    fail = "Something went wrong...",
    conflict = "Product name is already in used!",
    multisuccess = "Products added succesfully!"
}

enum LoginMessages
{
    success = "Welcome to <Website name>",
    fail = "Something went wrong",
    no_user = "No user found"
}


export { AddProductMessages, LoginMessages, SnackBarVariants };