import Head from "next/head";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* TODO */}
        <meta name="description" content="Web site created using create-react-app" /> 
        <title>default title</title>
      </Head>
     <Component {...pageProps} />
   </div>
  )
}