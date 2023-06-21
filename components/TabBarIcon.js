import {Image} from "react-native"
import bottomTabHome from "../assets/img/bottomTabHome.png"
import bottomTabPub from "../assets/img/bottomTabPub.png"
import bottomTabDrink from "../assets/img/bottomTabDrink.png"
import bottomTabMyPage from "../assets/img/bottomTabMyPage.png"
import bottomTabHomeSelected from "../assets/img/bottomTabHomeSelected.png"
import bottomTabPubSelected from "../assets/img/bottomTabPubSelected.png"
import bottomTabDrinkSelected from "../assets/img/bottomTabDrinkSelected.png"
import bottomTabMyPageSelected from "../assets/img/bottomTabMyPageSelected.png"

export const HomeIcon = ({focused}) => {
    const imgsrc = focused ? bottomTabHomeSelected : bottomTabHome;
    
    return (
        <Image source={imgsrc} />
    )
}
export const PubIcon = ({focused}) => {
    const imgsrc = focused ? bottomTabPubSelected : bottomTabPub;
    
    return (
        <Image source={imgsrc} />
    )
}

export const DrinkIcon = ({focused}) => {
    const imgsrc = focused ? bottomTabDrinkSelected : bottomTabDrink;
    
    return (
        <Image source={imgsrc} />
    )
}

export const MyPageIcon = ({focused}) => {
    const imgsrc = focused ? bottomTabMyPageSelected : bottomTabMyPage;
    
    return (
        <Image source={imgsrc} />
    )
}