
//action types
export const SHOW = 'SHOW';
export const HIDE = 'HIDE';


//product request messages

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

export { AddProductMessages, LoginMessages };