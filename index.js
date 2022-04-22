const form = document.querySelector('#add-item')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newItem = {
        name: formData.get('item-name'),
        sellIn: formData.get('item-sell-in'),
        startingQuality: formData.get('item-quality'),
        dateAdded: formData.get('date-added')
    }
    form.reset()

    localStorage.setItem('newItem', JSON.stringify(newItem))
})

const newItem = JSON.parse(localStorage.getItem('newItem'))
const newItemName = newItem.name
const dateNewItemAdded = new Date(`${newItem.dateAdded}`)

function calculateElapsedDays(date) {
    const dateNewItemAddedInMill = dateNewItemAdded.getTime()
    const currentDateInMill = Date.now()
    const elapsedMill = currentDateInMill - dateNewItemAddedInMill
    return elapsedDays = Math.floor((elapsedMill / (60 * 60 * 24 * 1000)))
}

const currentInventory = document.querySelector('#current-inventory')
const newRow = document.createElement('tr')
newRow.innerHTML = `
        <th>${newItem.name}</th>
        <th>${+newItem.sellIn - (calculateElapsedDays(newItem.dateAdded))}</th>
        <th>${newItem.startingQuality - (calculateElapsedDays(newItem.dateAdded))}</th>
        <th>${newItem.dateAdded}</th>
    `
currentInventory.append(newRow)