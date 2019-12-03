export default {
  raven: {
    ravenUrl: 'http://a9852c792da841d4a39a87d38cd997d6@sentry.digitalya.ro/55',
    whitelistUrls: [/juvo\.digitalya\.ro/]
  },
  apiUrl: (process.env.NODE_ENV === 'production') ? 'https://juvo-api.digitalya.ro/api/' : 'http://localhost:8080/api/',
  itemsPerPage: 10,
  generalError: {
    unknownError: ['An unknown error has occurred']
  },
  homepage: '/',
  storeKey: {
    token: 'juvo-token',
    user: 'juvo-user'
  },
  faxLinkDomain: '@nextivafax.com'
};
