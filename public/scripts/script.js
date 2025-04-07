
fetchDishes()
createFormForDish()

async function fetchDishes() {
    const response = await fetch('http://localhost:5000/api/dishes')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const dishes = await response.json()

    let dishId = 1
    dishes.forEach(dish => {
        //createDishCard(dish, dishId)
        createDishCardTable(dish, dishId)
        dishId++
    })
}
let dish;
function update(event) {
    const input = event.target.parentElement.querySelector('input')
    input.disabled = !input.disabled
    dish = input
    //ändrat lite där nere också när jag kallade på denna function dubbelkolla sen om det funkar

    //något med en global variabel kanske så när jag trycker update så ta infon som finns i inputfältet så jag vet tex update pasta spara det sen när jag trycker apply så vet jag att det var pasta some får det nya värdet när apply trycks.
}

//får nog ändra mitt id till _id för vad händer när jag tar bort sen lägger till då kommer det vara 1pasta send kanske 4 hamburager osv
async function apply(id, dish) {
    console.log(id)
    console.log("In the apply function")
    //mongoDB.updateDish(id, dish)
    const response = await fetch(`http://localhost:5000/api/dishes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: [dish] })
    })
    console.log("This is the response from the script.js: "+response)
    console.log("This is the dish from script.js: " + dish)
}

//kolla sen om man kan söka efter specifikt recept sen displaya bara det
//ALLT SOM EN TABLE SEN EN KNAPP MED STEPS OCH INGREDIENTS nu när det är fler SÅ DISPLAY:NONE SEN NÄR MAN TRYCKER SÅ DISPLAY:BLOCK SOM MED BLOG
/*
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
        const ingredientInput = document.createElement('input')
        ingredientInput.type = "text"
        ingredientInput.value = ingredient
        ingredientInput.disabled = true
        ingredientTR.appendChild(ingredientInput)
        
        const updateButton = document.createElement('button')
        updateButton.textContent = 'Update'
        updateButton.addEventListener('click', ()=>update(ingredientInput.value))
        const applyButton = document.createElement('button')
        applyButton.textContent = 'Apply'
        applyButton.addEventListener('click', ()=>apply(dish._id, ingredientInput.value))

        ingredientTR.appendChild(applyButton)
        ingredientsTable.appendChild(ingredientTR)
        ingredientTR.appendChild(updateButton)
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
    */

function createDishCardTable(dish, dishId) {
    const dishTable = document.createElement("table")
    const dishContainer = document.getElementById('container')
    const dishIdNum = document.createElement('th')
    dishIdNum.textContent = `${dishId}`
    const dishName = document.createElement('th')
    dishName.textContent = `${dish.name}`
    const ingredients = document.createElement('th')
    ingredients.textContent = 'Ingredients'
    const preparationSteps = document.createElement('th')
    preparationSteps.textContent = 'Preparation Steps'
    const cookingTime = document.createElement('th')
    cookingTime.textContent = 'Cooking Time'
    const origin = document.createElement('th')
    origin.textContent = 'Origin'
    const spiceLevel = document.createElement('th')
    spiceLevel.textContent = 'Spice Level'

    const dishTR = document.createElement('tr')
    dishTR.appendChild(dishIdNum)

    dishTR.appendChild(dishName)
    dishTR.appendChild(ingredients)
    dishTR.appendChild(preparationSteps)
    dishTR.appendChild(cookingTime)
    dishTR.appendChild(origin)
    dishTR.appendChild(spiceLevel)
    dishTable.appendChild(dishTR)

    const dishTR2 = document.createElement('tr')
    const dishIdNum2 = document.createElement('td')
    dishIdNum2.textContent = `${dishId}`
    const dishName2 = document.createElement('td')
    dishName2.textContent = `${dish.name}`
    const ingredients2 = document.createElement('td')
    const ingredientsButton = document.createElement('button')
    ingredientsButton.textContent = "Show Ingredients"
    const ingredientsTable = createIngredientsTable(dish.ingredients)
    ingredientsButton.addEventListener('click', () => {
        ingredientsTable.style.display = ingredientsTable.style.display === 'none' ? 'block' : 'none'
    })
    //ingredients2.textContent = `${dish.ingredients}`
    //const ingredientsList = document.createElement('ul')
/*     dish.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('input')
        ingredientItem.value = ingredient
        ingredientsList.appendChild(ingredientItem)
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        ingredientItem.appendChild(editButton)
    }) */
    const preparationSteps2 = document.createElement('td')
    preparationSteps2.textContent = `${dish.preparationSteps}`
    const cookingTime2 = document.createElement('td')
    cookingTime2.textContent = `${dish.cookingTime}`
    const origin2 = document.createElement('td')
    origin2.textContent = `${dish.origin}`
    const spiceLevel2 = document.createElement('td')
    spiceLevel2.textContent = `${dish.spiceLevel}`

    dishTR2.appendChild(dishIdNum2)
    dishTR2.appendChild(dishName2)
    dishTR2.appendChild(ingredientsTable)
    dishTR2.appendChild(ingredientsButton)
    dishTR2.appendChild(preparationSteps2)
    dishTR2.appendChild(cookingTime2)
    dishTR2.appendChild(origin2)
    dishTR2.appendChild(spiceLevel2)
    dishTable.appendChild(dishTR2)
    const updateButton = document.createElement('button')
    updateButton.textContent = 'Update'
    updateButton.addEventListener('click', ()=>update(ingredients2))
    const applyButton = document.createElement('button')
    applyButton.textContent = 'Apply'
    applyButton.addEventListener('click', ()=>apply(dish._id, ingredients2))
    dishTable.appendChild(updateButton)
    dishTable.appendChild(applyButton)
    
    dishContainer.appendChild(dishTable)
}

function createIngredientsTable(ingredients) {
    const ingredientsTable = document.createElement('table')
    ingredientsTable.style.display = 'none'
    for (const ingredient of ingredients) {
        const ingredientTR = document.createElement('tr')
        const ingredientInput = document.createElement('input')
        ingredientInput.type = "text"
        ingredientInput.value = ingredient
        ingredientInput.disabled = true
        const updateButton = document.createElement('button')
        updateButton.textContent = 'Update'
        updateButton.addEventListener('click', () => update(ingredientInput.value))
        const applyButton = document.createElement('button')
        applyButton.textContent = 'Apply'
        applyButton.addEventListener('click', () => apply(dish._id, ingredientInput.value))
        ingredientTR.appendChild(ingredientInput)
        ingredientTR.appendChild(updateButton)
        ingredientTR.appendChild(applyButton)
        ingredientsTable.appendChild(ingredientTR)
    }

    return ingredientsTable
}

function createFormForDish() {
    const form = document.createElement('form')
    form.id = 'dish_form'
    form.innerHTML = `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label for="ingredients">Ingredients:</label>
        <input type="text" id="ingredients" name="ingredients"><br><br>
        <label for="preparationSteps">Preparation Steps:</label>
        <input type="text" id="preparationSteps" name="preparationSteps"><button>+</button><br><br>
        <label for="cookingTime">Cooking Time:</label>
        <input type="text" id="cookingTime" name="cookingTime"><br><br>
        <label for="origin">Origin:</label>
        <input type="text" id="origin" name="origin"><br><br>
        <label for="spiceLevel">Spice Level:</label>
        <input type="text" id="spiceLevel" name="spiceLevel"><br><br>
        <input type="submit" id="submit_button" value="Submit">
    `
    const formContainer = document.getElementById('add-dish-form')
    formContainer.appendChild(form)
}

document.getElementById("submit_button").addEventListener("click", submit)

function submit(event) {
    const form = document.getElementById('dish_form')
    const id = form.elements['description'].value
    const name = form.elements['name'].value
    console.log(name)
    console.log(id)
}