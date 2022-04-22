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
    // form.reset()

    const currentInventory = document.querySelector('#current-inventory')
    const newRow = createNewRow(newItem)
    currentInventory.append(newRow)
})

function calculateElapsedDays(date) {
    const dateNewItemAdded = new Date(date)
    const dateNewItemAddedInMill = dateNewItemAdded.getTime()
    const currentDateInMill = Date.now()
    const elapsedMill = currentDateInMill - dateNewItemAddedInMill
    return elapsedDays = Math.floor((elapsedMill / (60 * 60 * 24 * 1000)))
}

function createNewRow(newItem) {
    const newRow = document.createElement('tr')
    const sellIn = calculateSellIn(newItem)
    const quality = qualityMinCheck(calculateQuality(newItem))
    newRow.innerHTML = `
        <th>${newItem.name}</th>
        <th>${sellIn}</th>
        <th>${quality}</th>
        <th>${newItem.dateAdded}</th>
    `
    return newRow
}

function calculateSellIn(newItem) {
    if (newItem.name.includes('Sulfuras')) {
        return 0
    } else {
        return newItem.sellIn - (calculateElapsedDays(newItem.dateAdded))
    }
}

function calculateQuality(newItem) {
    if (newItem.name.includes('Sulfuras')) {
        return 80
    } else if (newItem.name.includes('Conjured')) {
        if ((newItem.sellIn - (calculateElapsedDays(newItem.dateAdded)) < 0)) {
            return (newItem.startingQuality - ((2 * (newItem.sellIn)) + (4 * (calculateElapsedDays(newItem.dateAdded) - newItem.sellIn))))
        }
        else {
            return newItem.startingQuality - (2 * (calculateElapsedDays(newItem.dateAdded)))
        }
    } else {
        if ((newItem.sellIn - (calculateElapsedDays(newItem.dateAdded)) < 0)) {
            return (newItem.startingQuality - ((+newItem.sellIn) + (2 * ((calculateElapsedDays(newItem.dateAdded)) - newItem.sellIn))))
        }
        else {
            return newItem.startingQuality - ((calculateElapsedDays(newItem.dateAdded)))
        }
    }
}

function qualityMinCheck(quality) {
    if (quality < 0) {
        return 0
    } else {
        return quality
    }
}
