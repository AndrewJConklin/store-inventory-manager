const form = document.querySelector('#add-item')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const currentInventory = document.querySelector('#current-inventory')
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <th>${formData.get('item-name')}</th>
        <th>${formData.get('item-sell-in')}</th>
        <th>${formData.get('item-quality')}</th>
        <th>${formData.get('date-added')}</th>
    `
    currentInventory.append(newRow)
    form.reset()
})
