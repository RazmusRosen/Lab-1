fetchDishes()

async function fetchDishes() {
    const response = await fetch('http://localhost:5000/api/dishes')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const dishes = await response.json()

    let dishId = 1
    dishes.forEach(dish => {
        createDishCard(dish, dishId)
        dishId++
    })
}

function createDishCard(dish, dishId) {
    const dishContainer = document.getElementById('container')
    const dishCard = document.createElement("article")

    const fragment = document.createDocumentFragment()

    const dishName = document.createElement('h1')
    dishName.textContent = `${dishId}. ${dish.name}`
    fragment.appendChild(dishName)

    const ingredientsTable = document.createElement('table')
    const ingredients = document.createElement('th')
    ingredients.textContent = 'Ingredients'
    ingredientsTable.appendChild(ingredients)
    for(const ingredient of dish.ingredients) {
        const ingredientTR = document.createElement('tr')
        const ingredientName = document.createElement('td')
        ingredientName.textContent = ingredient
        ingredientTR.appendChild(ingredientName)
        ingredientsTable.appendChild(ingredientTR)
        fragment.appendChild(ingredientsTable)
    }

    const preparationStepsTable = document.createElement('table')
    const preparationSteps = document.createElement('th')
    preparationSteps.textContent = 'Preparation Steps'
    preparationStepsTable.appendChild(preparationSteps)
    fragment.appendChild(preparationStepsTable)

    let stepCounter = 1
    for(const step of dish.preparationSteps) {
        const preparationStepTR = document.createElement('tr')
        const preparationStepName = document.createElement('td')
        preparationStepName.textContent = `${stepCounter}. ${step}`
        preparationStepTR.appendChild(preparationStepName)
        preparationStepsTable.appendChild(preparationStepTR)
        fragment.appendChild(preparationStepsTable)
    }

    const cookingTimeH2 = document.createElement('h2')
    cookingTimeH2.textContent = 'Cooking Time'
    const cookingTimeP = document.createElement('p')
    cookingTimeP.textContent = `${dish.cookingTime} minutes`
    fragment.appendChild(cookingTimeH2)
    fragment.appendChild(cookingTimeP)

    const originH2 = document.createElement('h2')
    originH2.textContent = 'Origin'
    const originP = document.createElement('p')
    originP.textContent = dish.origin
    fragment.appendChild(originH2)
    fragment.appendChild(originP)

    const spiceLevel = document.createElement('h2')
    spiceLevel.textContent = 'Spice Level'
    const spiceLevelP = document.createElement('p')
    spiceLevelP.textContent = dish.spiceLevel
    fragment.appendChild(spiceLevel)
    fragment.appendChild(spiceLevelP)

    dishCard.appendChild(fragment)
    dishContainer.appendChild(dishCard)
}