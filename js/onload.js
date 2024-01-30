// JavaScript code to dynamically generate Pal entries
console.log('onload.js is executing');
Pal.readPals()
    .then(palArray => {
        const palContainer = document.getElementById('palContainer');

        palArray.forEach(pal => {
            const palEntry = document.createElement('div');
            palEntry.classList.add('palEntry');

            const palName = document.createElement('div');
            palName.classList.add('palName');
            palName.textContent = pal.name;

            const elementCircle = document.createElement('div');
            elementCircle.classList.add('elementCircle');

            if (pal.elem1 !== 'none') {
                elementCircle.classList.add(pal.elem1);
            }

            if (pal.elem2 !== 'none') {
                const dualElementCircle = document.createElement('div');
                dualElementCircle.classList.add('elementCircle', 'dual', pal.elem2);
                palEntry.appendChild(dualElementCircle);
            }

            palEntry.appendChild(palName);
            palEntry.appendChild(elementCircle);
            palContainer.appendChild(palEntry);
        });
    })
    .catch(error => {
        console.error(error);
    });
