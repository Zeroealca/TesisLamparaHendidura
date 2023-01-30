import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import type { Page } from "../types/page";

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer closeOnClick draggable theme="dark" />
    </>
  );
}
