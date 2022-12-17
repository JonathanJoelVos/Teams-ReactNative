import { BackButton, Container, Logo, BackIcon } from "./styles";
import LogoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type PropsHeader = {
    showBackButton?: boolean;
}

export default function Header({showBackButton = false}: PropsHeader) {
    const navigation = useNavigation();
    
    function handleGoBack() {
        navigation.navigate('groups');
    }
    return (
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={LogoImg}/>
        </Container>
    );
}