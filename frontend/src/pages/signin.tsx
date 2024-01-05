import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const SIGN_IN = gql`
  mutation SignIn($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }
`;

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  });

  const [signIn] = useMutation(SIGN_IN, {
    variables: {
      email,
      password,
    },
    onCompleted(data: any) {
      localStorage.setItem("token", data.signIn);
      router.push("/");
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <h2>Se connecter</h2>
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
      <div>
        <span>
          Envie de nous rejoindre ? <Link href="/signup"> Créer un compte</Link>
        </span>
      </div>
    </>
  );
}
