interface Alert
{
    title: string,
    content: string;
}

export const NoSrcAlert: Alert = {
    title: 'No image for product!',
    content: 'Are you sure you want to save this product without a picture?'
};