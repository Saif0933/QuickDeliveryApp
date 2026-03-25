import { NavigationProp } from "@react-navigation/native"

export type RootStack = {
    Login: undefined
    Otp: undefined
    Home: undefined
    Category: undefined
    ProductScreen: { category: string; vendorId: string; vendorName: string; vendorImage: string; menuImages?: string[], }
    FoodList: undefined 
    SingleResturantCart: {vendorId: number | string}
}



export type AppNavigation = {
    navigation: NavigationProp<RootStack>;
}