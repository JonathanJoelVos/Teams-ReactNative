import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons"; 

export type ButtonIconTypeStyleProps = "primary" | "secondary";

interface ButtonIconTypeStyle {
    type: ButtonIconTypeStyleProps;
}

export const Container = styled.TouchableOpacity`
    width: 56px;
    height: 56px;

    justify-content: center;
    align-items: center;

    margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconTypeStyle>(({theme, type}) => ({
    color: type === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
    size: 24,
}))``;

