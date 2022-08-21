import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {DocumentNode} from "graphql";
import {ApolloQueryResult, InMemoryCache} from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import * as uuid from 'uuid';

const GPORTAL_ROOT = '/gportal'; // <-- add the URL of the GraphQL server here

@Injectable({
  providedIn: 'root',
})
export class GenericGraphqlApiService {

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
  }

  genericGraphqlQuery(api: string, query: DocumentNode): Promise<ApolloQueryResult<unknown>> {
    const clientName = api + uuid.v4();
    console.log('api:', api, 'query: ', query);
    this.apollo.create({
      cache: new InMemoryCache(),
      link: this.httpLink.create({ uri: GPORTAL_ROOT + api })
    }, clientName);

    return this.apollo.use(clientName)
      .watchQuery({ query: query }).result()
      .then(GenericGraphqlApiService.fetchResultData)
      .finally(() => {
        this.apollo.removeClient(clientName);
      });
  }

  private static fetchResultData(result: any) {
    const data = result?.data;
    return data[Object.keys(data)[0]];
  }
}
