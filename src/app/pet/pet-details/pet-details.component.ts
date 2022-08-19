import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {PetModel} from "../model/pet-model";

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html'
})
export class PetDetailsComponent implements OnChanges {

  pet: PetModel;
  loading = true;
  error: any;

  @Input('childToMaster') petId: number;

  constructor(private apollo: Apollo) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.apollo.use("pets")
      .watchQuery({
        query: gql`
          {
            getPetById(petId:${changes.petId.currentValue}) {
             status
             name
             category {name}
            }
          }
        `,
      }).result().then((result: any) => {
      this.pet = result?.data?.getPetById;
      this.loading = result.loading;
      this.error = result.error;
    })
  }
}
