import { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconsProps = PropsWithChildren<{
    name: string
    size?: number
}>

const Icons = ({ name, size }: IconsProps) => {

    switch (name) {
        case 'circle':
            return <Icon name="circle-thin" size={size || 40} color="#E1A2B8" />
        case 'cross':
            return <Icon name="times" size={size || 40} color="#9004ff" />
        default:
            return// return <Icon name="pencil" size={35} color="#404040" />
    }
}

export default Icons