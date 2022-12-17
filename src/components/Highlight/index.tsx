import { SubTitle, Title, Container } from "./styles";

type PropsHighlight = {
   title: string;
    subtitle: string;
} 

export function Highlight({ title, subtitle }: PropsHighlight) {
  return (
    <Container>
        <Title>
            {title}
        </Title>
        <SubTitle>
            {subtitle}
        </SubTitle>
    </Container>
  );
}