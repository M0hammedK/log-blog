import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { AppProps } from "next/app";
import { StrictMode } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode >
      <Component {...pageProps}/>
    </StrictMode>
  );
};

export default MyApp;