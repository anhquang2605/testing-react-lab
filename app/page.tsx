import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <LoginForm 
      onLogin={(email, password) => console.log(email, password)}
    />
  );
}
