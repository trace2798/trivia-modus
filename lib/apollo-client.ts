// import { HttpLink } from '@apollo/client';
// import {
//   registerApolloClient,
//   ApolloClient,
//   InMemoryCache,
// } from '@apollo/experimental-nextjs-app-support';

// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       // this needs to be an absolute url, as relative urls cannot be used in SSR
//       //   uri: process.env.MODUS_API_BASE,
//       uri: process.env.MODUS_API_BASE,
//       //Uncomment this header part if you want to communicate with the hosted version or before deploying where you will need a hosted version.
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.HYPERMODE_API_TOKEN}`,
//       },
//       // you can disable result caching here if you want to
//       // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//       fetchOptions: { cache: 'no-store' },
//     }),
//   });
// });
import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const isProduction = process.env.NODE_ENV === 'production';

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
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
    }),
  });
});
