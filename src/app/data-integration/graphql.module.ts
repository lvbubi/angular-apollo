import {NgModule} from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const GPORTAL_ROOT = '/gportal'; // <-- add the URL of the GraphQL server here


/*
export function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
  return {
    pets: {
      name: 'second',
      link: httpLink.create({ uri: GPORTAL_ROOT }),
      cache: new InMemoryCache()
    }
  };
}
 */

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: GPORTAL_ROOT }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
