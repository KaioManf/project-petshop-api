async function getServiceTypeList() {
    const response = await fetch('http://localhost:3000/api/service-type')
    const data = await response.json()

    const serviceTypes = document.querySelectorAll('tr > td')

    serviceTypes.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const serviceTypeListContainer = document.getElementById('service-type-list-container')

    data.forEach(serviceType => {
        const newServiceTypeTr = document.createElement('tr')

        newServiceTypeTr.id = serviceType.id
        newServiceTypeTr.innerHTML = `
    <td>${serviceType.name}</td>
    <td>${serviceType.price}</td>
    <td>${serviceType.duration}</td>
    <button
        class="update-button"
        type="button"
        onclick="updateServiceType(${serviceType.id})">
        Atualizar
    </button>
    <button
        class="delete-button"
        type="button"
        onclick="deleteServiceType(${serviceType.id})">
        Excluir
    </button>
    `
        serviceTypeListContainer.appendChild(newServiceTypeTr)
    })
}

getServiceTypeList()

const createServiceTypeButton = document.getElementById('create-service-type-button')
createServiceTypeButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const price = document.querySelector('input[name="price"]').value
    const duration = document.querySelector('input[name="duration"]').value

    await fetch('http://localhost:3000/api/service-type', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            price,
            duration
        })
    })
    await getServiceTypeList()
    location.reload()
})

const apiURL = "http://localhost:3000"

async function deleteServiceType(serviceTypeId) {
    const deleteResult = await fetch(`${apiURL}/api/service-type/${serviceTypeId}`, {
        method: "DELETE",
    })

    const deleteResultJson = await deleteResult.json()

    if (deleteResultJson.deleteServicesTypeCount < 1) {
        console.error("Nenhum tipo de serviço foi deletado")
        return
    }

    /* const serviceTypeToBeDeleted = document.getElementById(`serviceType-id-${serviceTypeId}`)
    serviceTypeToBeDeleted.removeAttribute()

    return deleteResultJson */
    await getServiceTypeList()
}