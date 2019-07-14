export interface Item {
    Name: string
    Description: string
    Url: string
    Code: string
    Image: Image
    Review: Review
    Price: Price
    Category: Category
    Brands: Brands
    JanCode: string
    Store: Store
}

interface Image {
    Id: string
    Small: string
    Medium: string
}

interface Review {
    Rate: number
    Count: number
    Url: string
}

interface Price {
    _value: number
}

interface Category {
    Current: {
        Id: string
        Name: string
    }
}

interface Brands {
    Name: string
}

interface Store {
    Id: string
    Name: string
    Url: string
    Ratings: {
        Rate: number
        Count: number
        Total: number
        DetailRate: number
    }
    Image: {
        Id: string
        Medium: string
    }
}