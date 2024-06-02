document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('marriageForm');
    const brideDob = document.getElementById('brideDob');
    const groomDob = document.getElementById('groomDob');
    const brideDobError = document.getElementById('brideDobError');
    const groomDobError = document.getElementById('groomDobError');
    const brideGenotype = document.getElementById('brideGenotype');
    const groomGenotype = document.getElementById('groomGenotype');
    const brideGenotypeError = document.getElementById('brideGenotypeError');
    const groomGenotypeError = document.getElementById('groomGenotypeError');
    const marriageDate = document.getElementById('marriageDate');
    const marriageDateError = document.getElementById('marriageDateError');
    const brideEmail = document.getElementById('brideEmail');
    const groomEmail = document.getElementById('groomEmail');
    const brideEmailError = document.getElementById('brideEmailError');
    const groomEmailError = document.getElementById('groomEmailError');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const today = new Date();

        // Email validation function
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        // Validate emails
        if (!validateEmail(brideEmail.value)) {
            brideEmailError.textContent = 'Invalid email address.';
            isValid = false;
        } else {
            brideEmailError.textContent = '';
        }

        if (!validateEmail(groomEmail.value)) {
            groomEmailError.textContent = 'Invalid email address.';
            isValid = false;
        } else {
            groomEmailError.textContent = '';
        }

        // Validate ages
        const brideAge = today.getFullYear() - new Date(brideDob.value).getFullYear();
        const groomAge = today.getFullYear() - new Date(groomDob.value).getFullYear();

        if (brideAge < 18) {
            brideDobError.textContent = 'Under age, Not eligible by the constitution.';
            isValid = false;
        } else {
            brideDobError.textContent = '';
        }

        if (groomAge < 18) {
            groomDobError.textContent = 'Under age, Not eligible by the constitution.';
            isValid = false;
        } else {
            groomDobError.textContent = '';
        }

        // Validate genotypes
        const brideGenotypeValue = brideGenotype.value;
        const groomGenotypeValue = groomGenotype.value;

        if ((brideGenotypeValue === 'AS' && groomGenotypeValue === 'AS') ||
            (brideGenotypeValue === 'AC' && groomGenotypeValue === 'AC') ||
            (brideGenotypeValue === 'SS' && groomGenotypeValue === 'SS') ||
            (brideGenotypeValue === 'SC' && groomGenotypeValue === 'SC') ||
            (brideGenotypeValue === 'CC' && groomGenotypeValue === 'CC')) {
            brideGenotypeError.textContent = 'Genotype Incompatibility, Please Seek Medical Advice';
            groomGenotypeError.textContent = 'Genotype Incompatibility, Please Seek Medical Advice';
            isValid = false;
        } else {
            brideGenotypeError.textContent = '';
            groomGenotypeError.textContent = '';
        }

        // Validate proposed marriage date
        const marriageDateValue = new Date(marriageDate.value);
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 29); // Add 29 days to today

        if (marriageDateValue < minDate) {
            marriageDateError.textContent = 'The proposed marriage date must be at least 29 days from today.';
            isValid = false;
        } else {
            marriageDateError.textContent = '';
        }

        // Validate consent
        const brideConsent = document.getElementById('brideConsent').value;
        const groomConsent = document.getElementById('groomConsent').value;

        if (brideConsent === 'No' || groomConsent === 'No') {
            alert('Consent Must be Yes to Proceed');
            isValid = false;
        }

        // Submit the form if all validations pass
        if (isValid) {
            const formData = {
                brideName: document.getElementById('brideName').value,
                brideEmail: brideEmail.value,
                brideDob: brideDob.value,
                brideMaritalStatus: document.getElementById('brideMaritalStatus').value,
                brideConsent: brideConsent,
                groomName: document.getElementById('groomName').value,
                groomEmail: groomEmail.value,
                groomDob: groomDob.value,
                groomMaritalStatus: document.getElementById('groomMaritalStatus').value,
                groomConsent: groomConsent,
                brideBloodGroup: document.getElementById('brideBloodGroup').value,
                groomBloodGroup: document.getElementById('groomBloodGroup').value,
                brideGenotype: brideGenotype.value,
                groomGenotype: groomGenotype.value,
                marriageDate: marriageDate.value
            };

            fetch('https://forecasta.azurewebsites.net:443/api/formlogik/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=velWKOwqlrQny3snNp6b1yg5KwU3UKvzRZ3Q46-H-1E', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        });

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 29);
    marriageDate.setAttribute('min', minDate.toISOString().split('T')[0]);
});
