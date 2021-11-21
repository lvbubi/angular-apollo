import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';


@Component({
  selector: 'app-pet-component',
  styleUrls: ['./pet.component.css'],
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="pets">
      <div *ngFor="let pet of pets">
        <p>{{ pet.id }}: {{ pet.status }}</p>
      </div>
    </div>
  `
})
export class PetComponent implements OnInit {
  // @ts-ignore
  pets: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            findPetsByStatus(status:AVAILABLE){
              id
              status
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
      console.log(result);
      this.pets = result?.data?.findPetsByStatus;
      this.pets = this.pets.slice(0, 10);
      console.log(this.pets);
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
