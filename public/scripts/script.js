
fetchDishes()
createFormForDish()

async function fetchDishes() {
    const response = await fetch('http://localhost:5000/api/dishes')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const dishes = await response.json()
    console.log(dishes)

    let dishId = 1
    dishes.forEach(dish => {
        //createDishCard(dish, dishId)
        createDishCardTable(dish, dishId)
        dishId++
    })
}
let dish;
function update(input) {
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
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const responseData = await response.json()
    console.log(responseData)
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
    const dishContainer = document.getElementById('container');
    const dishTable = document.createElement("table");

    const dishTR = document.createElement('tr');
    const dishIdHead = document.createElement('th');
    dishIdHead.textContent = "Dish ID";
    dishTR.appendChild(dishIdHead);

    const dishName = document.createElement('th');
    dishName.textContent = "Dish Name";
    dishTR.appendChild(dishName);

    const ingredients = document.createElement('th');
    ingredients.textContent = 'Ingredients';
    dishTR.appendChild(ingredients);

    const preparationSteps = document.createElement('th');
    preparationSteps.textContent = 'Preparation Steps';
    dishTR.appendChild(preparationSteps);

    const cookingTime = document.createElement('th');
    cookingTime.textContent = 'Cooking Time (min)';
    dishTR.appendChild(cookingTime);

    const origin = document.createElement('th');
    origin.textContent = 'Origin';
    dishTR.appendChild(origin);

    const spiceLevel = document.createElement('th');
    spiceLevel.textContent = 'Spice Level';
    dishTR.appendChild(spiceLevel);

    dishTable.appendChild(dishTR);

    const dishTR2 = document.createElement('tr');

    const dishIdNum = document.createElement('td');
    dishIdNum.textContent = `${dishId}`;
    dishTR2.appendChild(dishIdNum);

    const dishName2 = document.createElement('td');
    const dishNameInput = document.createElement('input');
    dishNameInput.type = "text";
    dishNameInput.value = dish.name;
    dishNameInput.disabled = true;
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => update(dishNameInput));
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.addEventListener('click', async () => await apply(dish._id, dishNameInput.value));
    dishName2.appendChild(dishNameInput);
    dishName2.appendChild(updateButton);
    dishName2.appendChild(applyButton); 
    dishTR2.appendChild(dishName2);   


    const ingredientsCell = document.createElement('td');
    const ingredientsButton = document.createElement('button');
    ingredientsButton.textContent = "Show Ingredients";
    const ingredientsTable = createIngredientsTable(dish.ingredients);
    ingredientsButton.addEventListener('click', () => {
        ingredientsTable.style.display = ingredientsTable.style.display === 'none' ? 'block' : 'none';
    });
    ingredientsCell.appendChild(ingredientsButton);
    ingredientsCell.appendChild(ingredientsTable);
    dishTR2.appendChild(ingredientsCell);

    const preparationStepsCell = document.createElement('td');
    const preparationStepsButton = document.createElement('button');
    preparationStepsButton.textContent = "Show Preparation Steps";
    const preparationStepsTable = createPreparationStepsTable(dish.preparationSteps);
    preparationStepsButton.addEventListener('click', () => {
        preparationStepsTable.style.display = preparationStepsTable.style.display === 'none' ? 'block' : 'none';
    });
    preparationStepsCell.appendChild(preparationStepsButton);
    preparationStepsCell.appendChild(preparationStepsTable);
    dishTR2.appendChild(preparationStepsCell);

    const cookingTime2 = document.createElement('td');
    const cookingTimeInput = document.createElement('input');
    cookingTimeInput.type = "text";
    cookingTimeInput.value = dish.cookingTime;
    cookingTimeInput.disabled = true;
    const updateButton2 = document.createElement('button');
    updateButton2.textContent = 'Update';
    updateButton2.addEventListener('click', () => update(cookingTimeInput));
    const applyButton2 = document.createElement('button');
    applyButton2.textContent = 'Apply';
    applyButton2.addEventListener('click', () => apply(dish._id, cookingTimeInput.value));
    cookingTime2.appendChild(cookingTimeInput);
    cookingTime2.appendChild(updateButton2);
    cookingTime2.appendChild(applyButton2);
    dishTR2.appendChild(cookingTime2);

    const origin2 = document.createElement('td');
    const originInput = document.createElement('input');
    originInput.type = "text";
    originInput.value = dish.origin;
    originInput.disabled = true;
    const updateButton3 = document.createElement('button');
    updateButton3.textContent = 'Update';
    updateButton3.addEventListener('click', () => update(originInput));
    const applyButton3 = document.createElement('button');
    applyButton3.textContent = 'Apply';
    applyButton3.addEventListener('click', () => apply(dish._id, originInput));
    origin2.appendChild(originInput);
    origin2.appendChild(updateButton3);
    origin2.appendChild(applyButton3);
    dishTR2.appendChild(origin2);

    const spiceLevel2 = document.createElement('td');
    const spiceLevelInput = document.createElement('input');
    spiceLevelInput.type = "text";
    spiceLevelInput.value = dish.spiceLevel;
    spiceLevelInput.disabled = true;
    const updateButton4 = document.createElement('button');
    updateButton4.textContent = 'Update';
    updateButton4.addEventListener('click', () => update(spiceLevelInput));
    const applyButton4 = document.createElement('button');
    applyButton4.textContent = 'Apply';
    applyButton4.addEventListener('click', () => apply(dish._id, spiceLevelInput.value));
    spiceLevel2.appendChild(spiceLevelInput);
    spiceLevel2.appendChild(updateButton4);
    spiceLevel2.appendChild(applyButton4);
    dishTR2.appendChild(spiceLevel2);

    const deleteDishButton = document.createElement('button');
    deleteDishButton.textContent = 'Delete Dish';
    deleteDishButton.addEventListener('click', async () => {
        await deleteDish(dish._id);
        dishContainer.removeChild(dishTable);
    });
   
    const deleteDishCell = document.createElement('td');
    deleteDishCell.appendChild(deleteDishButton);
    dishTR2.appendChild(deleteDishCell);

    dishTable.appendChild(dishTR2);

    dishContainer.appendChild(dishTable);
}

async function deleteDish(id) {
    const response = await fetch(`http://localhost:5000/api/dishes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const responseData = await response.json()
    console.log(responseData)
}

function createPreparationStepsTable(preparationSteps) {
    const preparationStepsTable = document.createElement('table')
    preparationStepsTable.classList.add('steps-table')
    preparationStepsTable.style.display = 'none'
    for (const preparation of preparationSteps) {
        const preparationTR = document.createElement('tr')
        const preparationInput = document.createElement('input')
        preparationInput.type = "text"
        preparationInput.value = preparation
        preparationInput.disabled = true
        const updateButton = document.createElement('button')
        updateButton.textContent = 'Update'
        updateButton.addEventListener('click', () => update(preparationInput.value))
        const applyButton = document.createElement('button')
        applyButton.textContent = 'Apply'
        applyButton.addEventListener('click', () => apply(dish._id, preparationInput.value))
        preparationTR.appendChild(preparationInput)
        preparationTR.appendChild(updateButton)
        preparationTR.appendChild(applyButton)
        preparationStepsTable.appendChild(preparationTR)
    }
    return preparationStepsTable
}


function createIngredientsTable(ingredients) {
    const ingredientsTable = document.createElement('table')
    ingredientsTable.classList.add('steps-table')
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
    /*
    form.id = 'dish_form'
    form.method = 'POST'
    form.action = '/'
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const dish = {
            id: formData.get('id'),
            name: formData.get('name'),
            ingredients: formData.get('ingredients').split(','),
            preparationSteps: formData.get('preparationSteps').split(','),
            cookingTime: formData.get('cookingTime'),
            origin: formData.get('origin'),
            spiceLevel: formData.get('spiceLevel')
        }
        console.log(dish)
    } */

    form.innerHTML = `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label for="ingredients">Ingredients:</label>
        <input type="text" id="ingredients" name="ingredients"><br><br>
        <label for="preparationSteps">Preparation Steps:</label>

        <div id="preparationSteps-wrapper">
        <input type="text" id="preparationSteps" name="preparationSteps">
        <button id="add_button">+</button><br>
        </div>

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

    const addButton = document.getElementById('add_button')
    addButton.addEventListener('click', (event) => {
        event.preventDefault()
        addInput(form)
    })
}

function addInput(form) {
    const wrapper = document.getElementById('preparationSteps-wrapper')
    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.name = 'preparationSteps'
    newInput.placeholder = 'Preparation Steps'
    wrapper.appendChild(newInput)
    wrapper.appendChild(document.createElement("br")) // So it adds under the previous input
}

document.getElementById("submit_button").addEventListener("click", submit)

function submit(event) {
    const form = document.getElementById('dish_form')
    const id = form.elements['description'].value
    const name = form.elements['name'].value
    console.log(name)
    console.log(id)
}