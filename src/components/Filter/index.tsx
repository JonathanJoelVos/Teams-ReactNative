import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./styles";

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
    title: string;
    isActive: boolean;
}

export function Filter({title, isActive, ...rest}:  FilterProps) {
    return (
        <Container isActive={isActive} {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}