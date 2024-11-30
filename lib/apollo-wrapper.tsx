// 'use client';
// // ^ this file needs the "use client" pragma

// import { HttpLink } from '@apollo/client';
// import {
//   ApolloNextAppProvider,
//   ApolloClient,
//   InMemoryCache,
// } from '@apollo/experimental-nextjs-app-support';

// // have a function to create a client for you
// function makeClient() {
//   const isProduction = process.env.NODE_ENV === 'production';
//   const httpLink = new HttpLink({
//     // this needs to be an absolute url, as relative urls cannot be used in SSR
//     uri: process.env.MODUS_API_BASE,
//     //Uncomment this header part if you want to communicate with the hosted version or before deploying where you will need a hosted version.
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.HYPERMODE_API_TOKEN}`,
//     },
//     // you can disable result caching here if you want to
//     // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//     fetchOptions: { cache: 'no-store' },
//     // you can override the default `fetchOptions` on a per query basis
//     // via the `context` property on the options passed as a second argument
//     // to an Apollo Client data fetching hook, e.g.:
//     // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
//   });

//   // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
//   return new ApolloClient({
//     // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
//     cache: new InMemoryCache(),
//     link: httpLink,
//   });
// }

// // you need to create a component to wrap your app in
// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={makeClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }
'use client';
// ^ this file needs the "use client" pragma

import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

// Function to create the Apollo Client instance
function makeClient() {
  const isProduction = process.env.NODE_ENV === 'production';

  const httpLink = new HttpLink({
    // Dynamically set the URI based on the environment
    uri: isProduction
      ? process.env.MODUS_API_BASE
      : 'http://localhost:8686/graphql', // Replace with your development API base
    headers: isProduction
      ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HYPERMODE_API_TOKEN}`,
        }
      : {
          'Content-Type': 'application/json',
        },
    fetchOptions: { cache: 'no-store' }, // Disable result caching
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

// ApolloWrapper component to wrap your application
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
