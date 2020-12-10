type PetType = "Dog" | "Cat" | "Parrot" | "Rabbit";
type PetPastStatus = "Owned" | "Rescued";
//type NatureOfPet = "Gentle" | "Aggressive" | "Stubborn";
type PetBreedingHistory = "Domestic" | "Wild";

interface PetInfo {
  petType: PetType;
  petPastStatus: PetPastStatus;
  petBreedingHistory: PetBreedingHistory;
}

class PetRequest implements PetInfo {
  requestId: string;
  petType: PetType;
  petPastStatus: PetPastStatus;
  petBreedingHistory: PetBreedingHistory;
  requestCreatedAt: Date = new Date();

  constructor( petType: PetType, petPastStatus: PetPastStatus, petBreedingHistory: PetBreedingHistory) {
    this.requestId = "request_"+Math.floor(Math.random() * 10000);
    this.petType = petType;
    this.petPastStatus = petPastStatus;
    this.petBreedingHistory = petBreedingHistory;
  }
}

class Animal implements PetInfo {
  petId: string;
  petType: PetType;
  petPastStatus: PetPastStatus;
  petBreedingHistory: PetBreedingHistory;
  name: string;
  petAvailableFrom: Date = new Date();
  isPetAvailable: boolean = false;

  constructor( petType: PetType, petPastStatus: PetPastStatus, petBreedingHistory: PetBreedingHistory) {
    let petNames: string[] = [ "Mowgli","Twinkle","Roger","Kim","King","Raju","Bella","Charlie","Max","Bailey","Cooper","Daisy","Bruce",];
    this.petId = "pet_"+Math.floor(Math.random() * 10000);
    this.name = petNames[Math.floor(Math.random() * 13)];
    this.petType = petType;
    this.petPastStatus = petPastStatus;
    this.petBreedingHistory = petBreedingHistory;
  }
}

class Requirement {
  currentPetRequests: PetRequest[] = [];

  constructor() {}

  putRequest(request: PetRequest): PetRequest {
    request.requestCreatedAt = new Date();
    this.currentPetRequests.push(request);
    return request;
  }

  getAllRequests(): PetRequest[]{
    return this.currentPetRequests;
  }

  getPetRequestStatus(availability: Availability): Array<{request: PetRequest, available: boolean}> {
    let petRequestStatus: Array<{request: PetRequest, available: boolean}> = [];
    for (let i = 0; i < 5; i++) {
      petRequestStatus.push({
        request: this.currentPetRequests[i],
        available: availability.getAdoptionStatus(this.currentPetRequests[i]) !== undefined,
      });
  }
    return petRequestStatus;
  }
}

class Availability {
  currentAvailablePets: Animal[] = [];

  constructor() {}

  getAdoptionStatus(request: PetRequest): Animal | undefined {
    return this.currentAvailablePets.find((animal) => {
      if (
        animal.petType === request.petType &&
        animal.petPastStatus === request.petPastStatus &&
        animal.petBreedingHistory === request.petBreedingHistory
      ) {
        return animal;
      }
    });
  }

  addPetsToStore(animal: Animal): Animal[] {
    animal.isPetAvailable = true;
    animal.petAvailableFrom = new Date();
    this.currentAvailablePets.push(animal);
    return this.currentAvailablePets;
  }

  getPetsCount(): {dogs:number, cats:number, parrots: number, rabbits: number, others:number}{
    let animalCount = {dogs: 0, cats: 0, parrots: 0, rabbits: 0, others: 0}
    this.currentAvailablePets.forEach(animal => {
      switch (animal.petType){
        case "Dog" :  {
          animalCount.dogs++;
          break;
        }
        case "Cat" :  {
          animalCount.cats++;
          break;
        }
        case "Parrot" :  {
          animalCount.parrots++;
          break;
        }
        case "Rabbit" :  {
          animalCount.rabbits++;
          break;
        } 
        default: {
          animalCount.others++;
          break;
        }
      }
    })
    return animalCount;
  }

  mapAnimalsToRequests(requests: PetRequest[]):Array<{animal: Animal, petRequests: PetRequest[]}>{
    let map: Array<{animal: Animal, petRequests: PetRequest[]}> = []
    const petRequests = requests;
    this.currentAvailablePets.forEach(animal => {
      let animalToRequestMap = {animal: animal, petRequests};
      animalToRequestMap.petRequests = petRequests.filter(request => {
        return (animal.petType === request.petType) && (animal.petPastStatus === request.petPastStatus) && (animal.petBreedingHistory === request.petBreedingHistory)
      });
      
      map.push(animalToRequestMap);
    })
    return map;
  }
}

const availability = new Availability();
const requirement = new Requirement();

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
availability.addPetsToStore(animal3);
availability.addPetsToStore(animal4);
availability.addPetsToStore(animal5);
availability.addPetsToStore(animal6);
availability.addPetsToStore(animal7);
availability.addPetsToStore(animal8);

const request1 = new PetRequest("Parrot", "Rescued", "Wild");
const request2 = new PetRequest("Cat", "Rescued", "Domestic"); // This requirement will not be satisfied
const request3 = new PetRequest("Rabbit", "Owned", "Domestic");
const request4 = new PetRequest("Cat", "Owned", "Domestic");
const request5 = new PetRequest("Dog", "Owned", "Domestic");
const request6 = new PetRequest("Rabbit", "Rescued", "Wild");
const request7 = new PetRequest("Dog", "Rescued", "Domestic");
const request8 = new PetRequest("Dog", "Rescued", "Domestic");
const request9 = new PetRequest("Dog", "Rescued", "Domestic");
const request10 = new PetRequest("Dog", "Rescued", "Domestic");
const request11 = new PetRequest("Dog", "Rescued", "Domestic");
const request12 = new PetRequest("Dog", "Rescued", "Domestic");

requirement.putRequest(request1);
requirement.putRequest(request2);
requirement.putRequest(request3);
requirement.putRequest(request4);
requirement.putRequest(request5);
requirement.putRequest(request6);
requirement.putRequest(request7);
requirement.putRequest(request8);
requirement.putRequest(request9);
requirement.putRequest(request10);
requirement.putRequest(request11);
requirement.putRequest(request12);

// console.log(availability, requirement);
// console.log(animal1);

// Get status of five requirements of the request for animals
console.log('Pet Availability Status for first 5 Requests',requirement.getPetRequestStatus(availability));

console.log('Total Pets Count based on the type of pet',availability.getPetsCount());
console.log('Map of Pet available to current requests',availability.mapAnimalsToRequests(requirement.getAllRequests()));

