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

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 29);
    marriageDate.setAttribute('min', minDate.toISOString().split('T')[0]);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const today = new Date();

        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

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

        const brideGenotypeValue = brideGenotype.value;
        const groomGenotypeValue = groomGenotype.value;

        if ((brideGenotypeValue === 'AS' && groomGenotypeValue === 'AS') ||
            (brideGenotypeValue === 'AC' && groomGenotypeValue === 'AC') ||
            (brideGenotypeValue === 'AC' && groomGenotypeValue === 'AS') ||
            (brideGenotypeValue === 'AC' && groomGenotypeValue === 'CC') ||
            (brideGenotypeValue === 'AC' && groomGenotypeValue === 'SC') ||
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

        const marriageDateValue = new Date(marriageDate.value);
        if (marriageDateValue < minDate) {
            marriageDateError.textContent = 'The proposed marriage date must be at least 29 days from today.';
            isValid = false;
        } else {
            marriageDateError.textContent = '';
        }

        const brideConsent = document.getElementById('brideConsent').value;
        const groomConsent = document.getElementById('groomConsent').value;

        if (brideConsent === 'No' || groomConsent === 'No') {
            alert('Consent Must be Yes to Proceed');
            isValid = false;
        }

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

            fetch('https://prod-11.uksouth.logic.azure.com:443/workflows/5ef4363ef463487ebcd8b19c8723d5ff/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=2XrISlwEYyC3oOadwYvCzF21o6Bsy31WlECFZ77MY_Y', {
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
                form.reset(); // Reset the form after successful submission
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
            });
        }
    });
});
