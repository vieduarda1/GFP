export const enderecoServidor = 'http://localhost:3000'

import { MdDirectionsCar, MdShoppingCart, MdWallet, MdSchool, MdFavorite, MdSportsSoccer, MdRestaurant, MdFitnessCenter, MdPets, MdHome } from 'react-icons/md';


export const listaCores = ['#FF5733', '#FFC300', '#DAF7A6', '#33FF57', '#33A1FF', '#8D33FF', '#FF33EC', '#FF33A1', '#33FFF6', '#FF7F50'];
export const listaIcones = ['restaurant', 'directions-car', 'school', 'home', 'sports-soccer', 'shopping-cart', 'pets', 'favorite',
    'fitness-center', 'wallet'];


export const iconesCategoria = {
    'wallet': <MdWallet className="w-6 h-6" />,
    'school': <MdSchool className="w-6 h-6" />,
    'Favorite': <MdFavorite className="w-6 h-6" />,
    'sports-soccer': <MdSportsSoccer className="w-6 h-6" />,
    'restaurant': <MdRestaurant className="w-6 h-6" />,
    'home': <MdHome className="w-6 h-6" />,
    'fitness-center': <MdFitnessCenter className="w-6 h-6" />,
    'pets': <MdPets className="w-6 h-6" />,
    'directionscar': <MdDirectionsCar className="w-6 h-6" />,
    'shopping-cart': <MdShoppingCart className="w-6 h-6" />,

}