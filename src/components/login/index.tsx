import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { ThemeProvider } from "styled-components";
import { ButtonsContainer, FormContainer, LinkContainer, Main, Submit} from "./styles";
import { LogIn } from "lucide-react";

export default function Login() {
  const login = "admin"
  const password = "admin"

  
  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <FormContainer>
        <p>Entrar no sistema</p>
        <form>
          <div>
              <label>Login</label>
              <input type="text" name="login" placeholder="Digite seu login"/>
          </div>
         
          <div>
              <label>Senha</label>
              <input type="text" name="password" placeholder="Digite sua senha"/>
          </div>

      <ButtonsContainer>
        <Submit type="submit">
          <LogIn size={16} />
          <p>Entrar</p>
        </Submit>
      </ButtonsContainer>
        </form>
      </FormContainer>
    </Main>
    </ThemeProvider>
  )
}