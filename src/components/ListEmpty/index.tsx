import { Container, Menssage } from "./styled";

type PropsListEmpty = {
    menssage: string;
}
export default function ListEmpty({ menssage }: PropsListEmpty) {
  return (
    <Container>
        <Menssage>
            {menssage}
        </Menssage>
    </Container>
  );
}