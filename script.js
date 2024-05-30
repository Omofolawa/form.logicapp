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
    const brideProposedDate = document.getElementById('brideProposedDate');
    const groomProposedDate = document.getElementById('groomProposedDate');
    const brideProposedDateError = document.getElementById('brideProposedDateError');
    const groomProposedDateError = document.getElementById('groomProposedDateError');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const today = new Date();

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

        if (brideGenotypeValue === 'AS' && groomGenotypeValue === 'AS' ||
            brideGenotypeValue === 'AC' && groomGenotypeValue === 'AC' ||
            brideGenotypeValue === 'SS' && groomGenotypeValue === 'SS' ||
            brideGenotypeValue === 'SC' && groomGenotypeValue === 'SC' ||
            brideGenotypeValue === 'CC' && groomGenotypeValue === 'CC') {
            brideGenotypeError.textContent = 'Genotype Incompatibility, Please Seek Medical Advice';
            groomGenotypeError.textContent = 'Genotype Incompatibility, Please Seek Medical Advice';
            isValid = false;
        } else {
            brideGenotypeError.textContent = '';
            groomGenotypeError.textContent = '';
        }

        const brideProposedDateValue = new Date(brideProposedDate.value);
        const groomProposedDateValue = new Date(groomProposedDate.value);
        const minDate = new Date();
        minDate.setDate(today.getDate() + 29);

        if (brideProposedDateValue < minDate) {
            brideProposedDateError.textContent = 'The proposed marriage date must be at least 29 days from today.';
            isValid = false;
        } else {
            brideProposedDateError.textContent = '';
        }

        if (groomProposedDateValue < minDate) {
            groomProposedDateError.textContent = 'The proposed marriage date must be at least 29 days from today.';
            isValid = false;
        } else {
            groomProposedDateError.textContent = '';
        }

        if (isValid) {
            // Gather form data
            const formData = {
                brideName: document.getElementById('brideName').value,
                brideEmail: document.getElementById('brideEmail').value,
                brideDob: brideDob.value,
                brideMaritalStatus: document.getElementById('brideMaritalStatus').value,
                brideConsent: document.querySelector('input[name="brideConsent"]:checked').value,
                groomName: document.getElementById('groomName').value,
                groomEmail: document.getElementById('groomEmail').value,
                groomDob: groomDob.value,
                groomMaritalStatus: document.getElementById('groomMaritalStatus').value,
                groomConsent: document.querySelector('input[name="groomConsent"]:checked').value,
                brideBloodGroup: document.getElementById('brideBloodGroup').value,
                groomBloodGroup: document.getElementById('groomBloodGroup').value,
                brideGenotype: brideGenotype.value,
                groomGenotype: groomGenotype.value,
                brideProposedDate: brideProposedDate.value,
                groomProposedDate: groomProposedDate.value
            };

            const jsonData = JSON.stringify(formData);

            fetch('https://forecasta.azurewebsites.net:443/api/formlogic/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=Ego5vznZUh7w5f3f0CGyapbYOTC8KkY-W09P40Zi_HA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            }).then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                    form.reset();
                } else {
                    alert('Failed to submit the form.');
                }
            }).catch(error => {
                console.error('Error submitting the form:', error);
                alert('An error occurred while submitting the form.');
            });
        }
    });

    // Set the minimum date attribute to ensure the browser UI prevents selecting an earlier date
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 29);
    brideProposedDate.setAttribute('min', minDate.toISOString().split('T')[0]);
    groomProposedDate.setAttribute('min', minDate.toISOString().split('T')[0]);
});
