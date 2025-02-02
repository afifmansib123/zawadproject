import '../styles/globals.css';
import Header from './components/Header'
import Footer from './components/Footer';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



function MyApp({ Component, pageProps: { session, ...pageProps } })  {
  return(
  <>
  <SessionProvider session={session}>
  <Header/>
  <PayPalScriptProvider deferLoading={true}>
  {Component.auth ? (
      <Auth adminOnly={Component.auth.adminOnly}>
        <Component {...pageProps} />
      </Auth>
    ) : (
      <Component {...pageProps} />
    )}
    </PayPalScriptProvider>
  <Footer/>
  </SessionProvider>
  </>
  )
}


function Auth({ children, adminOnly}) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}

export default MyApp;

