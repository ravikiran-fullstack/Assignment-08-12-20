var PetRequest = /** @class */ (function () {
    function PetRequest(petType, petPastStatus, petBreedingHistory) {
        this.petType = petType;
        this.petPastStatus = petPastStatus;
        this.petBreedingHistory = petBreedingHistory;
    }
    return PetRequest;
}());
var Animal = /** @class */ (function () {
    function Animal(petType, petPastStatus, petBreedingHistory) {
        this.petAvailableFrom = null;
        this.isPetAvailable = false;
        var petNames = ['Mowgli', 'Twinkle', 'Roger', 'Kim', 'King', 'Raju', 'Bella', 'Charlie', 'Max', 'Bailey', 'Cooper', 'Daisy', 'Bruce'];
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
    Requirement.prototype.putRequest = function (request) {
        request.requestCreatedAt = new Date();
        this.currentPetRequests.push(request);
        return request;
    };
    Requirement.prototype.getPetRequestStatus = function (availability) {
        var petRequestStatus = [];
        for (var i = 0; i < 5; i++) {
            var availableAnimal = availability.getAdoptionStatus(this.currentPetRequests[i]);
            if (availableAnimal) {
                petRequestStatus.push({ request: this.currentPetRequests[i], status: true });
            }
            else {
                petRequestStatus.push({ request: this.currentPetRequests[i], status: false });
            }
        }
        return petRequestStatus;
    };
    return Requirement;
}());
var Availability = /** @class */ (function () {
    function Availability() {
        this.currentAvailablePets = [];
    }
    Availability.prototype.getAdoptionStatus = function (request) {
        return this.currentAvailablePets.find(function (animal) {
            if ((animal.petType === request.petType) && (animal.petPastStatus === request.petPastStatus) && (animal.petBreedingHistory === request.petBreedingHistory)) {
                return animal;
            }
        });
    };
    Availability.prototype.addPetsToStore = function (animal) {
        animal.isPetAvailable = true;
        animal.petAvailableFrom = new Date();
        this.currentAvailablePets.push(animal);
        return this.currentAvailablePets;
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
availability.addPetsToStore(animal2);
availability.addPetsToStore(animal3);
availability.addPetsToStore(animal4);
availability.addPetsToStore(animal5);
availability.addPetsToStore(animal6);
availability.addPetsToStore(animal7);
availability.addPetsToStore(animal8);
var request1 = new PetRequest("Parrot", "Rescued", "Wild");
var request2 = new PetRequest("Cat", "Rescued", "Domestic");
var request3 = new PetRequest("Rabbit", "Owned", "Domestic");
var request4 = new PetRequest("Cat", "Owned", "Domestic");
var request5 = new PetRequest("Dog", "Owned", "Domestic");
var request6 = new PetRequest("Rabbit", "Rescued", "Wild");
var request7 = new PetRequest("Dog", "Rescued", "Domestic");
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
