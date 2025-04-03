
const dishContainer = document.getElementById('dish-container')

const fragment = document.createDocumentFragment()

const dishName = document.createElement('h1')
dishName.textContent = 'Pasta'

const ingredientsTable = document.createElement('table')
const ingredients = document.createElement('th')
ingredients.textContent = 'Ingredients'
ingredientsTable.appendChild(ingredients)
const ingredient1 = document.createElement('tr')
const ingredient1Name = document.createElement('td')
ingredient1Name.textContent = 'Pasta'
ingredient1.appendChild(ingredient1Name)
const ingredient2 = document.createElement('tr')
const ingredient2Name = document.createElement('td')
ingredient2Name.textContent = 'Water'
ingredient2.appendChild(ingredient2Name)

const preparationStepsTable = document.createElement('table')
const preparationSteps = document.createElement('th')
preparationSteps.textContent = 'Preparation Steps'
preparationStepsTable.appendChild(preparationSteps)
const preparationStep1 = document.createElement('tr')
const preparationStep1Name = document.createElement('td')
preparationStep1Name.textContent = 'Boil water'
preparationStep1.appendChild(preparationStep1Name)
const preparationStep2 = document.createElement('tr')
const preparationStep2Name = document.createElement('td')
preparationStep2Name.textContent = 'Add pasta'
preparationStep2.appendChild(preparationStep2Name)
const preparationStep3 = document.createElement('tr')
const preparationStep3Name = document.createElement('td')
preparationStep3Name.textContent = 'Cook for 10 minutes'

const cookingTimeH2 = document.createElement('h2')
cookingTimeH2.textContent = 'Cooking Time'
const cookingTimeP = document.createElement('p')
cookingTimeP.textContent = '20 minutes'


const originH2 = document.createElement('h2')
originH2.textContent = 'Origin'
const originP = document.createElement('p')
originP.textContent = 'Italy'

const spiceLevel = document.createElement('h2')
spiceLevel.textContent = 'Spice Level'
const spiceLevelP = document.createElement('p')
spiceLevelP.textContent = 'Mild'

fragment.appendChild(dishName)
fragment.appendChild(ingredientsTable)
ingredientsTable.appendChild(ingredient1)
ingredientsTable.appendChild(ingredient2)
ingredientsTable.appendChild(preparationStepsTable)
preparationStepsTable.appendChild(preparationStep1)
preparationStepsTable.appendChild(preparationStep2)
preparationStepsTable.appendChild(preparationStep3)
fragment.appendChild(cookingTimeH2)
fragment.appendChild(cookingTimeP)
dishContainer.appendChild(fragment)
