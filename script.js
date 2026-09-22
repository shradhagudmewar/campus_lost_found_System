// ==========================================
// Campus Lost & Found System
// ==========================================


// Array for storing item data

let items = [
    {
        id: 1,
        itemName: "Black Wallet",
        description: "Black leather wallet with college ID",
        location: "Library",
        date: "2026-09-20",
        contact: "9876543210",
        type: "Lost"
    },

    {
        id: 2,
        itemName: "Blue Water Bottle",
        description: "Blue Milton water bottle",
        location: "Canteen",
        date: "2026-09-21",
        contact: "9123456780",
        type: "Found"
    }
];


// Get form

const form = document.getElementById("itemForm");


// ==========================================
// Form Submit Event
// ==========================================

form.addEventListener("submit", function(event) {

    // Stop page from refreshing

    event.preventDefault();


    // Clear old errors

    clearErrors();


    // Get input values

    const itemName =
        document.getElementById("itemName").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const date =
        document.getElementById("date").value.trim();

    const contact =
        document.getElementById("contact").value.trim();


    // Get selected radio button

    const selectedType =
        document.querySelector('input[name="itemType"]:checked');


    let isValid = true;


    // ==========================================
    // Validation
    // ==========================================


    // Item Name

    if (itemName === "") {

        document.getElementById("itemNameError").textContent =
            "Item name is required.";

        isValid = false;

    }

    else if (itemName.length < 3) {

        document.getElementById("itemNameError").textContent =
            "Item name must contain at least 3 characters.";

        isValid = false;

    }


    // Description

    if (description === "") {

        document.getElementById("descriptionError").textContent =
            "Description is required.";

        isValid = false;

    }

    else if (description.length < 10) {

        document.getElementById("descriptionError").textContent =
            "Description must contain at least 10 characters.";

        isValid = false;

    }


    // Location

    if (location === "") {

        document.getElementById("locationError").textContent =
            "Location is required.";

        isValid = false;

    }


    // Date

    if (date === "") {

        document.getElementById("dateError").textContent =
            "Please select a date.";

        isValid = false;

    }


    // Contact

    const phonePattern = /^[0-9]{10}$/;


    if (contact === "") {

        document.getElementById("contactError").textContent =
            "Contact number is required.";

        isValid = false;

    }

    else if (!phonePattern.test(contact)) {

        document.getElementById("contactError").textContent =
            "Enter a valid 10-digit mobile number.";

        isValid = false;

    }


    // Item Type

    if (selectedType === null) {

        document.getElementById("typeError").textContent =
            "Please select Lost or Found.";

        isValid = false;

    }


    // ==========================================
    // Stop if validation fails
    // ==========================================

    if (!isValid) {

        return;

    }


    // ==========================================
    // Create JSON Object
    // ==========================================

    const newItem = {

        id: Date.now(),

        itemName: itemName,

        description: description,

        location: location,

        date: date,

        contact: contact,

        type: selectedType.value

    };


    // ==========================================
    // Add JSON object to Array
    // ==========================================

    items.push(newItem);


    // Show success message

    document.getElementById("successMessage").textContent =
        "✅ Item added successfully!";


    // Clear form

    form.reset();


    // Display items

    displayItems();


    // Update statistics

    updateStatistics();


    // Remove success message after 3 seconds

    setTimeout(function() {

        document.getElementById("successMessage").textContent = "";

    }, 3000);

});


// ==========================================
// Clear Error Messages
// ==========================================

function clearErrors() {

    document.getElementById("itemNameError").textContent = "";

    document.getElementById("descriptionError").textContent = "";

    document.getElementById("locationError").textContent = "";

    document.getElementById("dateError").textContent = "";

    document.getElementById("contactError").textContent = "";

    document.getElementById("typeError").textContent = "";

}


// ==========================================
// Display Items
// ==========================================

function displayItems() {

    const container =
        document.getElementById("itemsContainer");


    // Get search value

    const searchText =
        document.getElementById("searchInput").value
        .toLowerCase()
        .trim();


    // Get selected filter

    const filter =
        document.getElementById("filterType").value;


    // Filter array

    const filteredItems = items.filter(function(item) {

        const matchesSearch =
            item.itemName.toLowerCase().includes(searchText) ||
            item.location.toLowerCase().includes(searchText);


        const matchesFilter =
            filter === "All" ||
            item.type === filter;


        return matchesSearch && matchesFilter;

    });


    // Clear container

    container.innerHTML = "";


    // If no item found

    if (filteredItems.length === 0) {

        container.innerHTML =
            '<div class="no-items">No items found.</div>';

        return;

    }


    // Display every item

    filteredItems.forEach(function(item) {


        // Create card

        const card =
            document.createElement("div");


        card.className = "item-card";


        // Type class

        const typeClass =
            item.type === "Lost"
            ? "lost"
            : "found";


        // Card HTML

        card.innerHTML = `

            <span class="item-type ${typeClass}">
                ${item.type}
            </span>

            <h3>${item.itemName}</h3>

            <p>
                <strong>Description:</strong>
                ${item.description}
            </p>

            <p>
                <strong>📍 Location:</strong>
                ${item.location}
            </p>

            <p>
                <strong>📅 Date:</strong>
                ${item.date}
            </p>

            <p>
                <strong>📞 Contact:</strong>
                ${item.contact}
            </p>

            <button
                class="delete-btn"
                onclick="deleteItem(${item.id})">

                🗑 Delete

            </button>

        `;


        // Add card to container

        container.appendChild(card);

    });

}


// ==========================================
// Delete Item
// ==========================================

function deleteItem(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this item?");


    if (!confirmDelete) {

        return;

    }


    // Remove item from array

    items = items.filter(function(item) {

        return item.id !== id;

    });


    // Refresh display

    displayItems();


    // Update statistics

    updateStatistics();

}


// ==========================================
// Search Event
// ==========================================

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        displayItems();

    });


// ==========================================
// Filter Event
// ==========================================

document
    .getElementById("filterType")
    .addEventListener("change", function() {

        displayItems();

    });


// ==========================================
// Update Statistics
// ==========================================

function updateStatistics() {


    // Total

    const total =
        items.length;


    // Lost

    const lost =
        items.filter(function(item) {

            return item.type === "Lost";

        }).length;


    // Found

    const found =
        items.filter(function(item) {

            return item.type === "Found";

        }).length;


    // Display values

    document.getElementById("totalItems").textContent =
        total;


    document.getElementById("lostItems").textContent =
        lost;


    document.getElementById("foundItems").textContent =
        found;

}


// ==========================================
// Initial Display
// ==========================================

displayItems();

updateStatistics(); 