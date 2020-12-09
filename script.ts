type PetType = "Dog" | "Cat" | "Parrot" | "Rabbit";
type PetPastStatus = "Owned" | "Rescued";
//type NatureOfPet = "Gentle" | "Aggressive" | "Stubborn";
type PetBreedingHistory = "Domestic" | "Wild";

interface PetInfo{
  petType: PetType;
  petPastStatus: PetPastStatus;
  petBreedingHistory: PetBreedingHistory; 
}

class PetRequest implements PetInfo{
  petType: PetType;
  petPastStatus: PetPastStatus;
  petBreedingHistory: PetBreedingHistory; 
  requestCreatedAt: Date;

  constructor(petType: PetType, petPastStatus: PetPastStatus, petBreedingHistory: PetBreedingHistory){
    this.petType = petType;
    this.petPastStatus = petPastStatus;
    this.petBreedingHistory = petBreedingHistory;
  }
}

class Animal implements PetInfo{
  petType: PetType;
  petPastStatus: PetPastStatus;
  petBreedingHistory: PetBreedingHistory; 
  name: string;
  petAvailableFrom: Date = null;
  isPetAvailable: boolean = false;

  constructor(petType: PetType, petPastStatus: PetPastStatus, petBreedingHistory: PetBreedingHistory){
    let petNames: string[] = ['Mowgli', 'Twinkle', 'Roger', 'Kim', 'King', 'Raju', 'Bella', 'Charlie', 'Max', 'Bailey', 'Cooper', 'Daisy', 'Bruce'];
    this.name = petNames[Math.floor(Math.random() * 13)];
    this.petType = petType;
    this.petPastStatus = petPastStatus;
    this.petBreedingHistory = petBreedingHistory;
  }
}

class Requirement{
  
  currentPetRequests: PetRequest[] = [];

  constructor(){
    
  }

  putRequest(request: PetRequest): PetRequest{
    request.requestCreatedAt =  new Date();
    this.currentPetRequests.push(request);
    return request;
  }

  getPetRequestStatus(availability: Availability): Array<{}>{
    let petRequestStatus: object[] = [];
    for(let i = 0; i < 5; i++){
      let availableAnimal = availability.getAdoptionStatus(this.currentPetRequests[i]);
      if(availableAnimal){
        petRequestStatus.push({request: this.currentPetRequests[i], status: true});
      } else {
        petRequestStatus.push({request: this.currentPetRequests[i], status: false});
      }
    }
    return petRequestStatus;
  }

  
}

class Availability{

  currentAvailablePets: Animal[] = [];

  constructor(){

  }

  getAdoptionStatus(request: PetRequest): Animal{
    
    return this.currentAvailablePets.find(animal => {
       if((animal.petType === request.petType) && (animal.petPastStatus === request.petPastStatus) && (animal.petBreedingHistory === request.petBreedingHistory)){
        return animal;
       }
    });
  }

  addPetsToStore(animal: Animal):Animal[]{
    animal.isPetAvailable =  true;
    animal.petAvailableFrom = new Date();
    this.currentAvailablePets.push(animal);
    return this.currentAvailablePets;
  }

}

const availability = new Availability();
const requirement =  new Requirement();

//petType: PetType, petPastStatus: PetPastStatus, petBreedingHistory: PetBreedingHistory
const animal1 = new Animal("Dog", "Owned", "Domestic");
const animal2 = new Animal("Cat", "Rescued", "Wild");
const animal3 = new Animal("Parrot", "Rescued", "Wild");
const animal4 = new Animal("Rabbit", "Owned", "Domestic");
const animal5 = new Animal("Cat", "Owned", "Domestic");
const animal6 = new Animal("Dog", "Rescued", "Domestic");
const animal7 = new Animal("Dog", "Owned", "Domestic");
const animal8 = new Animal("Parrot", "Rescued", "Wild");
const animal9 = new Animal("Rabbit", "Rescued", "Wild");
const animal10 = new Animal("Cat", "Rescued", "Wild");

availability.addPetsToStore(animal1);
availability.addPetsToStore(animal2);
availability.addPetsToStore(animal2);
availability.addPetsToStore(animal3);
availability.addPetsToStore(animal4);
availability.addPetsToStore(animal5);
availability.addPetsToStore(animal6);
availability.addPetsToStore(animal7);
availability.addPetsToStore(animal8);

const request1 = new PetRequest("Parrot", "Rescued", "Wild");
const request2 = new PetRequest("Cat", "Rescued", "Domestic");
const request3 = new PetRequest("Rabbit", "Owned", "Domestic");
const request4 = new PetRequest("Cat", "Owned", "Domestic");
const request5 = new PetRequest("Dog", "Owned", "Domestic");
const request6 = new PetRequest("Rabbit", "Rescued", "Wild");
const request7 = new PetRequest("Dog", "Rescued", "Domestic");

requirement.putRequest(request1);
requirement.putRequest(request2);
requirement.putRequest(request3);
requirement.putRequest(request4);
requirement.putRequest(request5);
requirement.putRequest(request6);
requirement.putRequest(request7);

// console.log(availability, requirement);
// console.log(animal1);

console.log(requirement.getPetRequestStatus(availability));

// Get status of five requirements of the request for animals
  // Check if the animals are available as per the request


