import { PetModel } from "../pet-example/model/pet-model";

export interface PetApi {
  getAvailablePets(): Promise<PetModel[]>;
  getPetById(id: number): Promise<PetModel>;
}
