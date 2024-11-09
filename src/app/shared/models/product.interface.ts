export interface Product {
  id: number,
  title: string,
  description: string,
  category: string
  price: number,
  quantity: number,
  subtotal: number,
  image: string,
  rating: Rating
}

interface Rating {
  rate: number,
  count: number
}
