async function getServiceList() {
    const response = await fetch('http://localhost:3000/api/service')
    const data = await response.json()

    const services = document.querySelectorAll('tr > td')

    services.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const serviceListContainer = document.getElementById('service-list-container')

    data.forEach(service => {
        const newServiceTr = document.createElement('tr')

        newServiceTr.id = service.id
        newServiceTr.innerHTML = `
    <td>${service.service_type}</td>
    <td>${service.animal}</td>
    <td>${service.scheduled_date}</td>
        <td class="register-actions">
            <button
                class="update-button"
                type="button"
                onclick="updateService(${service.id})">
                Atualizar
            </button>
            <button
                class="delete-button"
                type="button"
                onclick="deleteService(${service.id})">
                Excluir
            </button>
        </td>
    `
        serviceListContainer.appendChild(newServiceTr)
    })
}

getServiceList()

const createServiceButton = document.getElementById('create-service-button')
createServiceButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const service_type = document.querySelector('input[name="service_type"]').value
    const animal = document.querySelector('input[name="animal"]').value
    const scheduled_date = document.querySelector('input[name="scheduled_date"]').value

    await fetch('http://localhost:3000/api/service', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_type,
            animal,
            scheduled_date
        })
    })
    await getServiceList()
    location.reload()
})

const apiURL = "http://localhost:3000"

async function deleteService(serviceId) {
    const deleteResult = await fetch(`${apiURL}/api/service/${serviceId}`, {
        method: "DELETE",
    })

    const deleteResultJson = await deleteResult.json()

    if (deleteResultJson.deleteServicesCount < 1) {
        console.error("Nenhum serviço foi deletado")
        return
    }

    /* const serviceToBeDeleted = document.getElementById(`service-id-${serviceId}`)
    serviceToBeDeleted.removeAttribute()

    return deleteResultJson */
    await getServiceList()
}