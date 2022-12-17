import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Menssage = styled.Text`
    text-align: center;
    
    ${({theme}) => css`

        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONTS.REGULAR};
        color: ${theme.COLORS.GRAY_300};
    `}
`;