var PetRequest = /** @class */ (function () {
    function PetRequest(petType, petPastStatus, petBreedingHistory) {
        this.requestCreatedAt = new Date();
        this.requestId = "request_" + Math.floor(Math.random() * 10000);
        this.petType = petType;
        this.petPastStatus = petPastStatus;
        this.petBreedingHistory = petBreedingHistory;
    }
    return PetRequest;
}());
var Animal = /** @class */ (function () {
    function Animal(petType, petPastStatus, petBreedingHistory) {
        this.petAvailableFrom = new Date();
        this.isPetAvailable = false;
        var petNames = ["Mowgli", "Twinkle", "Roger", "Kim", "King", "Raju", "Bella", "Charlie", "Max", "Bailey", "Cooper", "Daisy", "Bruce",]; // List of possible pet names
        this.petId = "pet_" + Math.floor(Math.random() * 10000);
        this.name = petNames[Math.floor(Math.random() * 13)];
        this.petType = petType;
        this.petPastStatus = petPastStatus;
        this.petBreedingHistory = petBreedingHistory;
    }
    return Animal;
}());
var Requirement = /** @class */ (function () {
    function Requirement() {
        this.currentPetRequests = [];
    }
    // Method to insert a request for pets
    Requirement.prototype.putRequest = function (request) {
        request.requestCreatedAt = new Date();
        this.currentPetRequests.push(request);
        return request;
    };
    Requirement.prototype.getAllRequests = function () {
        return this.currentPetRequests;
    };
    // Method to retrieve the status of the five requests
    Requirement.prototype.getPetRequestStatus = function (availability) {
        var petRequestStatus = [];
        for (var i = 0; i < 5; i++) {
            petRequestStatus.push({
                request: this.currentPetRequests[i],
                available: availability.getAdoptionStatus(this.currentPetRequests[i]) !== undefined
            });
        }
        return petRequestStatus;
    };
    return Requirement;
}());
var Availability = /** @class */ (function () {
    function Availability() {
        this.currentAvailablePets = [];
    }
    // Method to find the adoption status for the input request
    Availability.prototype.getAdoptionStatus = function (request) {
        return this.currentAvailablePets.find(function (animal) {
            if (animal.petType === request.petType &&
                animal.petPastStatus === request.petPastStatus &&
                animal.petBreedingHistory === request.petBreedingHistory) {
                return animal;
            }
        });
    };
    // Method to make different kinds of animals available at pet store
    Availability.prototype.addPetsToStore = function (animal) {
        animal.isPetAvailable = true;
        animal.petAvailableFrom = new Date();
        this.currentAvailablePets.push(animal);
        return this.currentAvailablePets;
    };
    // Method to find the number of animals in each type of animals
    Availability.prototype.getPetsCount = function () {
        var animalCount = { dogs: 0, cats: 0, parrots: 0, rabbits: 0, others: 0 };
        this.currentAvailablePets.forEach(function (animal) {
            switch (animal.petType) {
                case "Dog": {
                    animalCount.dogs++;
                    break;
                }
                case "Cat": {
                    animalCount.cats++;
                    break;
                }
                case "Parrot": {
                    animalCount.parrots++;
                    break;
                }
                case "Rabbit": {
                    animalCount.rabbits++;
                    break;
                }
                default: {
                    animalCount.others++;
                    break;
                }
            }
        });
        return animalCount;
    };
    // Method to map the animals in the pet store with the requests made for these pets
    Availability.prototype.mapAnimalsToRequests = function (requests) {
        var map = [];
        var petRequests = requests;
        this.currentAvailablePets.forEach(function (animal) {
            var animalToRequestMap = { animal: animal, petRequests: petRequests };
            animalToRequestMap.petRequests = petRequests.filter(function (request) {
                return (animal.petType === request.petType) && (animal.petPastStatus === request.petPastStatus) && (animal.petBreedingHistory === request.petBreedingHistory);
            });
            map.push(animalToRequestMap);
        });
        return map;
    };
    return Availability;
}());
var availability = new Availability();
var requirement = new Requirement();
//petType: PetType, petPastStatus: PetPastStatus, petBreedingHistory: PetBreedingHistory
var animal1 = new Animal("Dog", "Owned", "Domestic");
var animal2 = new Animal("Cat", "Rescued", "Wild");
var animal3 = new Animal("Parrot", "Rescued", "Wild");
var animal4 = new Animal("Rabbit", "Owned", "Domestic");
var animal5 = new Animal("Cat", "Owned", "Domestic");
var animal6 = new Animal("Dog", "Rescued", "Domestic");
var animal7 = new Animal("Dog", "Owned", "Domestic");
var animal8 = new Animal("Parrot", "Rescued", "Wild");
var animal9 = new Animal("Rabbit", "Rescued", "Wild");
var animal10 = new Animal("Cat", "Rescued", "Wild");
availability.addPetsToStore(animal1);
availability.addPetsToStore(animal2);
availability.addPetsToStore(animal3);
availability.addPetsToStore(animal4);
availability.addPetsToStore(animal5);
availability.addPetsToStore(animal6);
availability.addPetsToStore(animal7);
availability.addPetsToStore(animal8);
var request1 = new PetRequest("Parrot", "Rescued", "Wild");
var request2 = new PetRequest("Cat", "Rescued", "Domestic"); // This requirement will not be satisfied
var request3 = new PetRequest("Rabbit", "Owned", "Domestic");
var request4 = new PetRequest("Cat", "Owned", "Domestic");
var request5 = new PetRequest("Dog", "Owned", "Domestic");
var request6 = new PetRequest("Rabbit", "Rescued", "Wild");
var request7 = new PetRequest("Dog", "Rescued", "Domestic");
var request8 = new PetRequest("Dog", "Rescued", "Domestic");
var request9 = new PetRequest("Dog", "Rescued", "Domestic");
var request10 = new PetRequest("Dog", "Rescued", "Domestic");
var request11 = new PetRequest("Dog", "Rescued", "Domestic");
var request12 = new PetRequest("Dog", "Rescued", "Domestic");
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
console.log('Pet Availability Status for first 5 Requests', requirement.getPetRequestStatus(availability));
console.log('Total Pets Count based on the type of pet', availability.getPetsCount());
console.log('Map of Pet available to current requests', availability.mapAnimalsToRequests(requirement.getAllRequests()));
