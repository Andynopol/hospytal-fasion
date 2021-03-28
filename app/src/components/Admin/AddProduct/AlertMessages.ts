interface Alert
{
    title: string,
    content: string;
}

export const addProductAlertInfo: Alert = {
    title: 'Invalid info!',
    content: 'A product must have at least name and a price. Complete the mandatory fields in order to add a new product.'
};