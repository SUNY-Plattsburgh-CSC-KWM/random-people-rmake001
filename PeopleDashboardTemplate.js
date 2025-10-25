async function fetchUsers() {
    try {
        let response = await fetch('https://randomuser.me/api/?results=20&nat=us');
        let data = await response.json();
        let users = data.results;
        let people = users.map(user => ({
            firstName: user.name.first,
            lastName: user.name.last,
            street: `${user.location.street.number} ${user.location.street.name}`,
            city: user.location.city,
            state: user.location.state,
            zip: user.location.postcode,
            lat: user.location.coordinates.latitude,
            lon: user.location.coordinates.longitude,
            phone: user.phone
        }));
        people.sort((a, b) => a.lastName.localeCompare(b.lastName));
        let table = $('#people');
        table.find('tr:gt(0)').remove();
        people.forEach(person => {
            let row = $('<tr></tr>');
            row.append(`<td title="${person.phone}">${person.firstName} ${person.lastName}</td>`);
            row.append(`<td>${person.street}</td>`);
            row.append(`<td>${person.city}</td>`);
            row.append(`<td>${person.state}</td>`);
            row.append(`<td>${person.zip}</td>`);
            row.append(`<td>${person.lat}</td>`);
            row.append(`<td>${person.lon}</td>`);
            table.append(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

$(document).ready(fetchUsers);
