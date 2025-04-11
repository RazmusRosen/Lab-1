
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
async function apply(id, field, updatedValue, index=null, className=null) {
    console.log("In the apply function")
    console.log(field)
    console.log(field.includes("ingredients"))
    if(field.includes("ingredients") === true || field === "preparationSteps") {
    const container = []
        const inputArray = document.querySelectorAll(`.${className}`)
        console.log("THIS IS THE ARRAY AFTER QUERYSELECTOR ALL: "+ inputArray[index].value)
        inputArray[index].value = updatedValue
        for (const input of inputArray) {
            if(input.value === "") {
                continue
            }
            container.push(input.value)
        }
        updatedValue = container
    }
    console.log(id)
    console.log("In the apply function")
    const updatedDish = {[field]: updatedValue}
    const response = await fetch(`http://localhost:5000/api/dishes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDish)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const responseData = await response.json()
    console.log(responseData)
}

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
    dishNameInput.id = "name"
    dishNameInput.disabled = true;
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => update(dishNameInput));
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.addEventListener('click', async () => await apply(dish._id, dishNameInput.id, dishNameInput.value));
    dishName2.appendChild(dishNameInput);
    dishName2.appendChild(updateButton);
    dishName2.appendChild(applyButton); 
    dishTR2.appendChild(dishName2);   


    const ingredientsCell = document.createElement('td');
    const ingredientsButton = document.createElement('button');
    ingredientsButton.textContent = "Show Ingredients";
    const ingredientsTable = createIngredientsTable(dish._id,dish.ingredients);
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


function createIngredientsTable(dish_id, ingredients) {
    const ingredientsTable = document.createElement('table')
    ingredientsTable.classList.add('steps-table')
    ingredientsTable.style.display = 'none'

    let index = 0
    for (const ingredient of ingredients) {
        const ingredientTR = document.createElement('tr')
        const ingredientInput = document.createElement('input')
        ingredientInput.type = "text"
        ingredientInput.value = ingredient
        ingredientInput.disabled = true
        ingredientInput.className = `Dish-${dish_id}`
        ingredientInput.id = index
        const updateButton = document.createElement('button')
        updateButton.textContent = 'Update'
        updateButton.addEventListener('click', () => update(ingredientInput))
        const applyButton = document.createElement('button')
        applyButton.textContent = 'Apply'
        applyButton.addEventListener('click', async () => await apply(dish_id, "ingredients", ingredientInput.value, ingredientInput.id, ingredientInput.className))
        ingredientTR.appendChild(ingredientInput)
        ingredientTR.appendChild(updateButton)
        ingredientTR.appendChild(applyButton)
        ingredientsTable.appendChild(ingredientTR)
        index++

    }

    return ingredientsTable
}

function createFormForDish() {
    const form = document.createElement('form')
    form.id = "dish_form"
    form.method = "POST"
    form.action = "/api/dishes"

    const dishName = document.createElement('label')
    dishName.textContent = "Dish Name"
    dishName.setAttribute('for', 'dish_name')
    const dishNameInput = document.createElement('input')
    dishNameInput.type = "text"
    dishNameInput.id = "dish_name"
    dishNameInput.name = "dish_name"
    dishNameInput.required = true
    form.appendChild(dishName)
    form.appendChild(dishNameInput)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))

    const ingredientsLabel = document.createElement('label')
    ingredientsLabel.textContent = "Ingredients"
    ingredientsLabel.setAttribute('for', 'ingredients')
    const ingredientsInputWrapper = document.createElement('div')
    ingredientsInputWrapper.id = "ingredients-wrapper"
    const ingredientsInput = document.createElement('input')
    ingredientsInput.type = "text"
    ingredientsInput.id = "ingredients"
    ingredientsInput.name = "ingredients"
    const addIngredients = document.createElement('button')
    addIngredients.textContent = "+"
    addIngredients.type = "button"
    addIngredients.id = "add_ingredients_button"
    addIngredients.addEventListener('click', (event) => {
        event.preventDefault()
        const br = document.createElement('br')
        ingredientsInputWrapper.appendChild(br)
        console.log("add button clicked ingredients")
        addInput(ingredientsInputWrapper, ingredientsInput)
    })

    ingredientsInputWrapper.appendChild(ingredientsInput)
    ingredientsInputWrapper.appendChild(addIngredients)
    form.appendChild(ingredientsLabel)
    form.appendChild(ingredientsInputWrapper)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))

    const preparationStepsLabel = document.createElement('label')
    preparationStepsLabel.textContent = "Preparation Steps"
    preparationStepsLabel.setAttribute('for', 'preparation_steps')
    const div = document.createElement('div')
    div.id = "preparationSteps-wrapper"
    const preparationStepsInput = document.createElement('input')
    preparationStepsInput.type = "text"
    preparationStepsInput.id = "preparation_steps"
    preparationStepsInput.name = "preparation_steps"
    const addButton = document.createElement('button')
    addButton.textContent = "+"
    addButton.type = "button"
    addButton.id = "add_button"
    addButton.addEventListener('click', (event) => {
        event.preventDefault()
        const br = document.createElement('br')
        div.appendChild(br)
        console.log("add button clicked preparation steps")
        addInput(div, preparationStepsInput)
    })
    div.appendChild(preparationStepsInput)
    div.appendChild(addButton)
    form.appendChild(preparationStepsLabel)
    form.appendChild(div)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))
    const cookingTimeLabel = document.createElement('label')
    cookingTimeLabel.textContent = "Cooking Time (min)"
    cookingTimeLabel.setAttribute('for', 'cooking_time')
    const cookingTimeInput = document.createElement('input')
    cookingTimeInput.type = "text"
    cookingTimeInput.id = "cooking_time"
    cookingTimeInput.name = "cooking_time"
    cookingTimeInput.required = true
    form.appendChild(cookingTimeLabel)
    form.appendChild(cookingTimeInput)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))
    const originLabel = document.createElement('label')
    originLabel.textContent = "Origin"
    originLabel.setAttribute('for', 'origin')
    const originInput = document.createElement('input')
    originInput.type = "text"
    originInput.id = "origin"
    originInput.name = "origin"
    originInput.required = true
    form.appendChild(originLabel)
    form.appendChild(originInput)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))
    const spiceLevelLabel = document.createElement('label')
    spiceLevelLabel.textContent = "Spice Level"
    spiceLevelLabel.setAttribute('for', 'spice_level')
    const spiceLevelInput = document.createElement('input')
    spiceLevelInput.type = "text"
    spiceLevelInput.id = "spice_level"
    spiceLevelInput.name = "spice_level"
    const submitButton = document.createElement('button')
    submitButton.textContent = "Submit"
    submitButton.type = "submit"
    submitButton.id = "submit_button"
    form.appendChild(spiceLevelLabel)
    form.appendChild(spiceLevelInput)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))
    form.appendChild(submitButton)
    form.appendChild(document.createElement('br'))
    form.appendChild(document.createElement('br'))
    const formContainer = document.getElementById('add-dish-form')
    formContainer.appendChild(form)
}

function addInput(wrapper, input) {
    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.name = input.name
    newInput.id = input.id
    wrapper.appendChild(newInput)

}

document.getElementById("submit_button").addEventListener("click", submit)

function submit(event) {
    const form = document.getElementById('dish_form')
    event.preventDefault()
    const preparationStepsArray = []
    const ingredientsArray = []
    const formData = new FormData(form)
    const name = formData.get('dish_name')
    const preparationSteps = formData.getAll('preparation_steps')
    const ingredients = formData.getAll('ingredients')
    for (const step of preparationSteps) {
        if(step === "") {
            continue
        }
        preparationStepsArray.push(step)
    }
    for (const ingredient of ingredients) {
        if(ingredient === "") {
            continue
        }
        ingredientsArray.push(ingredient)
    }
    const cookingTime = formData.get('cooking_time')
    const origin = formData.get('origin')
    const spiceLevel = formData.get('spice_level')
    const dish = {
        name: name,
        ingredients: ingredientsArray,
        preparationSteps: preparationStepsArray,
        cookingTime: cookingTime,
        origin: origin,
        spiceLevel: spiceLevel
    }
    console.log(dish)
    postDish(dish)
}

async function postDish(dish) {
    const response = await fetch('http://localhost:5000/api/dishes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dish)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const responseData = await response.json()
    return responseData
}