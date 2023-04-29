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
            const plantDetail = `<div id="plant-info">
                        <h2>Here's a plant you should know about:</h2>
                        <h3>${plant.name}</h3>
                        <img src="${plant.image}" alt="${plant.name}">
                        <p><strong>Use:</strong> ${plant.use}</p>
                        <p><strong>Environments it can be grown in:</strong> ${plant.environments.join(', ')}</p>
                        <p><strong>Growing tips:</strong> ${plant.tips}</p>
                        <p><strong>Interesting fact:</strong> ${plant.fact}</p>
                    </div>`;

            this.plantDetails.innerHTML = plantDetail;
        });
    }
}

const ui = new UI();
ui.init();
