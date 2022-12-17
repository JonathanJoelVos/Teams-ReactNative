import { Title, Container, IconUsersThree } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface PropsGroupCard extends TouchableOpacityProps{
  title: string;
}

export function GroupCard({ title, ...rest }: PropsGroupCard) {
  return (
    <Container {...rest}>
        <IconUsersThree />
        <Title>
          {title}
        </Title>
    </Container>
  );
}