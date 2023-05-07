import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Exo+2&display=swap" rel="stylesheet"/>                
                {/* 
					manifest.json provides metadata used when your web app is installed on a
					user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ 
				*/}
                {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
                {/*
					Notice the use of %PUBLIC_URL% in the tags above.
					It will be replaced with the URL of the `public` folder during the build.
					Only files inside the `public` folder can be referenced from the HTML.

					Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
					work correctly both with client-side routing and a non-root public URL.
					Learn how to configure a non-root public URL by running `npm run build`.
				*/}
            </Head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
