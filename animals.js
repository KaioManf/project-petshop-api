async function getAnimalList() {
    const response = await fetch('http://localhost:3000/api/animal')
    const data = await response.json()

    const animals = document.querySelectorAll('tr > td')

    animals.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const animalListContainer = document.getElementById('animal-list-container')

    data.forEach(animal => {
        const newAnimalTr = document.createElement('tr')

        newAnimalTr.id = animal.id
        newAnimalTr.innerHTML = `
    <td>${animal.name}</td>
    <td>${animal.breed}</td>
    <td>${animal.age}</td>
    <td>${animal.weight}</td>
    <td>${animal.owner_name}</td>
    <td>${animal.is_vacinated}</td>
        <td class="register-actions">
            <button
                class="update-button"
                type="button"
                onclick="updateAmimal(${animal.id})">
                Atualizar
            </button>
            <button
                class="delete-button"
                type="button"
                onclick="deleteAnimal(${animal.id})">
                Excluir
            </button>
        </td>
    `
        animalListContainer.appendChild(newAnimalTr)
    })
}

getAnimalList()

const createAnimalButton = document.getElementById('create-animal-button')
createAnimalButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const breed = document.querySelector('input[name="breed"]').value
    const age = document.querySelector('input[name="age"]').value
    const weight = document.querySelector('input[name="weight"]').value
    const owner_name = document.querySelector('input[name="owner_name"]').value
    const is_vacinated = document.querySelector('input[name="is_vacinated"]').value

    await fetch('http://localhost:3000/api/animal', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            breed,
            age,
            weight,
            owner_name,
            is_vacinated
        })
    })
    await getAnimalList()
    location.reload()
})

const apiURL = "http://localhost:3000"

async function deleteAnimal(animalId) {
    const deleteResult = await fetch(`${apiURL}/api/animals/${animalId}`, {
        method: "DELETE",
    })

    const deleteResultJson = await deleteResult.json()

    if (deleteResultJson.deleteAnimalsCount < 1) {
        console.error("Nenhum animal foi deletado")
        return
    }

    /* const animalToBeDeleted = document.getElementById(`animal-id-${animalId}`)
    animalToBeDeleted.removeAttribute()

    return deleteResultJson */
    await getAnimalList()
}