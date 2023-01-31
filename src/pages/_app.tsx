import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import type { Page } from "../types/page";
import { SessionProvider } from "next-auth/react";
import UserProvider from "src/context/provider";

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider>
        <UserProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </UserProvider>
      </SessionProvider>
    );
  }
  return (
    <SessionProvider>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </UserProvider>
    </SessionProvider>
  );
}
