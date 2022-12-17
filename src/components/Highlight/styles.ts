import styled, { css } from "styled-components/native";


export const Container = styled.View`
    margin: 60px 0;
    width: 100%;
`;

export const Title = styled.Text`
    text-align: center;

    ${({theme}) => css`
        font-size: ${theme.FONT_SIZE.XL}px;
        font-family: ${theme.FONTS.BOLD};
        color: ${theme.COLORS.WHITE};
    `}
` ;

export const SubTitle = styled.Text`
    text-align: center;
    
    ${({theme}) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONTS.REGULAR};
        color: ${theme.COLORS.GRAY_300};
    `}
` ;