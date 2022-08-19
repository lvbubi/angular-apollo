import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {PetModel} from "../model/pet-model";

@Component({
  selector: 'app-pet-names',
  templateUrl: './pet-names.component.html'
})
export class PetNamesComponent implements OnInit {

  pets: PetModel[];
  loading = true;
  error: any;

  @Output() childToParent = new EventEmitter<number>();

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.use("pets2")
      .watchQuery({
        query: gql`
          {
            findPetsByStatus(status:PENDING){
              id
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
      this.pets = result?.data?.findPetsByStatus;
      this.pets = this.pets.slice(0, 10);
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  onPetClickEvent(id: number) {
    this.childToParent.emit(id);
  }
}
