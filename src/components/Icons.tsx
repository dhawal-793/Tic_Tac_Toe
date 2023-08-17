import { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconsProps = PropsWithChildren<{
    name: string
}>

const Icons = ({ name }: IconsProps) => {

    switch (name) {
        case 'circle':
            return <Icon name="circle-thin" size={40} color="#90ffff" />
        case 'cross':
            return <Icon name="times" size={40} color="#9004ff" />
        default:
            return <Icon name="pencil" size={35} color="#404040" />
    }
} 

export default Icons