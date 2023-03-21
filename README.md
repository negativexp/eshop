# E-SHOP (nezuko)
A working (without payment section) e-shop using React.js for client side code, Node.js for server code and MongoDB for database.

## Dev building
For dev building you also need MongoDB Atlas!
1. Build frontend in app folder `npm run build`
2. Run server `npm run dev`

## DB Schema
Database is set on 3 collections
1. Products
    ```yaml
    title: string
    shortDescription: string
    longDescription: string
    category: string
    subCategory: string
    productID: number
    ```
2. Categories (with sub-categories)
    ```yaml
    category: string
    subCategories: string array
    ```
3. Orders
    ```yaml
    firstName: string
    lastName: string
    email: string
    phoneNumber: number
    city: string
    address: string
    postalCode: number
    status: string {processing/shipped/closed}
    orderedProducts: string
    totalPrice: number
    ```