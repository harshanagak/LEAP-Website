class Plants {
    constructor() {
        this.plants = [];
    }

    async fetchPlantsData() {
        const response = await fetch('plants.json');
        const data = await response.json();
        this.plants = data.plants;
    }

    getRandomPlant() {
        const randomIndex = Math.floor(Math.random() * this.plants.length);
        return this.plants[randomIndex];
    }
}

class UI {
    constructor() {
        this.plantsContainer = document.getElementById('plants-container');
        this.plantDetails = document.getElementById('plant-details');
        this.plants = new Plants();
    }

    async init() {
        await this.plants.fetchPlantsData();
        this.plantsContainer.addEventListener('click', async () => {
            const plant = this.plants.getRandomPlant();
            const plantDetail = `<div class="card" style="width: 25rem; font-family: 'Courier New', monospace; margin-bottom:3%">
            <img src="${plant.image}" class="card-img-top mx-auto d-block" alt="${plant.name}" style="width: 90%">
            <div class="card-body text-center">
              <p class="card-title">${plant.name}</p>
              </div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item"><h4>Use:</h4> ${plant.use}</li>
              <li class="list-group-item"><h4>Environments it can be grown in: </h4> ${plant.environments.join(', ')}</li>
            </ul>
            <div class="card-body text-center">
              <a href="https://jmflandscaping.com/20-interesting-plants-world/" class="card-link">Learn more</a>
            </div>
          </div>
          `

            this.plantDetails.innerHTML = plantDetail;
        });
    }
}

const ui = new UI();
ui.init();
