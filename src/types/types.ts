import { NavigationProp } from "@react-navigation/native"

export type RootStack = {
    Login: undefined
    Otp: undefined
    Home: undefined
    Category: undefined
    ProductScreen: undefined
    FoodList: undefined 
}



export type AppNavigation = {
    navigation: NavigationProp<RootStack>;
}