import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import UserAuthContext from "@/context/UserAuthContext";
import Layout from "@/layouts/layout";
import { wrapper } from "@/store/store";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

export default function App({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {pageProps} = props;
  return (
  
  <>
    <SWRConfig>
      <CookiesProvider>
        <Provider store={store}>
          <UserAuthContext>
            <Layout>
              <Component {...pageProps} />
              <Analytics/>
            </Layout>
          </UserAuthContext>
        </Provider>
      </CookiesProvider>
    </SWRConfig>
  </>
  )
}
