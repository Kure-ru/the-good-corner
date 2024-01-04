import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const SIGN_UP = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      email
      username
    }
  }
`;

export default function SignUpPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signUp] = useMutation(SIGN_UP, {
    variables: {
      username,
      email,
      password,
    },
    onCompleted() {
      router.push("/signin");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signUp();
      }}
    >
      <h2>Créer un compte</h2>
      <div>
        <label htmlFor="">Nom d&apos;utilisateur</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="">Adresse email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="">Mot de passe</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}
