export const environment = {
  production: false,
  auth0: {
    domain: 'https://jichi-dev.us.auth0.com',
    clientId: 'sFDFTn7A3ffDW6VLFKWvCNWeQFau0abR',
    clientSecret: 'A6oq0KvR8GlY4cP__3fxMR0cNRG9YC6jsW3XqtKO3f9Q_su0xfvhVI109MlQ93p9'
  },
  onboardingApi: 'https://onboarding-dev.jichi.com.bo',
  salesApi: 'https://sells-dev.jichi.com.bo',
  stocksApi: 'https://stocks-dev.jichi.com.bo',
  paymentsApi: 'https://payments-dev.jichi.com.bo',
  appInsights: {
    instrumentationKey: '#{{APPI_CONNECTION_STRING}}#',
  },

  Bouncer: {
    BOUNCER_SECRET : 'N62u@Um%ocx*Us4r',
    BOUNCER_IDENTIFIER:'jichi_app',
    BOUNCER_BASE_URL:'https://bfsmb-staging-bouncer.fassil.com.bo',
    BOUNCER_ISSUER:'https://bfsmb-staging-bouncer-v2.fassil.com.bo',
    BOUNCER_CALLBACK: 'http://localhost:4200/app/payments/link-account'
  },

  currency : [
    {
    
      viewValue: 'Bolivianos',
      value: 'Bolivianos',
    },
    {
      viewValue: 'Dolares',
      value: 'Dollars',
    }
  ],

  jichiCatalogo: 'https://www.jichi.com.bo/negocios',

};