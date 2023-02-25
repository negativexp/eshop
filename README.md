## Dev building
1. Build frontend in app folder `npm run build`
2. Run server `npm run dev`

## DB Schema
### Product
```yaml 
productTitle: string
productShortDescription: string
productLongDescription: string
productCategory: string
productSubCategory: string
productID: number
```

### Orders
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