import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { ThemeProvider } from "styled-components";
import { ButtonsContainer, FormContainer, LinkContainer, Main, Submit} from "./styles";
import { LogIn } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function Login() {

  const logIn = (e:any) => {
    e.preventDefault();

    const login:string = e.target.login.value;
    const password:string  = e.target.password.value;

    if(login == "admin" && password == "admin"){
        const token = uuidv4();

        localStorage.setItem("TOKEN_FRONT", token)
        window.location.href = "/customer-registration"
    }else(
      console.log("Login ou senha inválidas ")
    )
  }

  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <FormContainer onSubmit={(e) => logIn(e)}>
        <p>Entrar no sistema</p>
        <form>
          <div>
              <label>Login</label>
              <input type="text" name="login" placeholder="Digite seu login"/>
          </div>
         
          <div>
              <label>Senha</label>
              <input type="password" name="password" placeholder="Digite sua senha"/>
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