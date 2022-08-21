import {NgModule} from '@angular/core';
import {APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const GPORTAL_ROOT = '/gportal'; // <-- add the URL of the GraphQL server here


export function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
  return {
    pets: {
      name: 'second',
      link: httpLink.create({ uri: GPORTAL_ROOT + '/pets' }),
      cache: new InMemoryCache()
    },
    pets2: {
      name: 'third',
      link: httpLink.create({ uri: GPORTAL_ROOT + '/pets2' }),
      cache: new InMemoryCache()
    }
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createNamedApollo,
      deps: [HttpLink],
    },
  ],
})
export class PetGraphqlModule {}
