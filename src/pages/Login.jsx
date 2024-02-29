import { Helmet } from "react-helmet";
import { LoginForm } from "../components/LoginForm/LoginForm.jsx";

export default function Login() {
    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <LoginForm />
        </div>
    );
}
