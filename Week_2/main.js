const typeSelectEl = document.getElementById('fileType');
const form = document.getElementsByTagName('form')[0];
const actionBtn = document.getElementById('configure');
const actionContainer = document.getElementsByClassName('action')[0];

let selectedOptions = [];

typeSelectEl.addEventListener('change', (e) => {
    selectedOptions = Array.from(e.target.selectedOptions);
});

actionBtn.addEventListener('click', function(){
    if (selectedOptions.length === 0) return;

    generateConfigurationFields(selectedOptions, actionContainer);

    this.setAttribute('disabled', true);
});

function generateConfigurationFields(selectedOptions, actionContainer) {
    const configureField = document.createElement('div');
    configureField.className = 'configureField';

    selectedOptions.forEach((option) => {
        const field = document.createElement('div');
        field.className = 'field';

        const typeOfEl = document.createElement('p');
        typeOfEl.textContent = `Type: ${option.text}`;

        const labelfield = createLabelAndInput('Label', 'inputLabelEl' + option.value);
        const namefield = createLabelAndInput('Name', 'inputNameEl' + option.value);

        field.appendChild(typeOfEl);
        field.appendChild(labelfield);
        field.appendChild(namefield);
        configureField.appendChild(field);
    });

    actionContainer.appendChild(configureField);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.id = 'addBtn';
    addBtn.textContent = 'Add field';
    actionContainer.appendChild(addBtn);

    addBtn.addEventListener('click', function () {
        const dynamicFieldProps = getDynamicFieldProps();

        if (selectedOptions.length === dynamicFieldProps.length) {
            createDynamicFields(dynamicFieldProps, form);
            document.querySelectorAll('.configureField').forEach((el) => el.remove());
            actionBtn.removeAttribute('disabled');
            this.remove();
        }
    });
}

function createLabelAndInput(labelText, inputId) {
    const container = document.createElement('div');
    const labelEl = document.createElement('label');
    labelEl.textContent = labelText;
    labelEl.setAttribute('for', inputId);
    const inputEl = document.createElement('input');
    inputEl.id = inputId;
    inputEl.name = inputId;
    container.appendChild(labelEl);
    container.appendChild(inputEl);
    return container;
}

function getDynamicFieldProps() {
    const dynamicFieldProps = [];
    const selectedOptions = document.querySelectorAll('.field');

    selectedOptions.forEach((el) => {
        const children = el.querySelectorAll('input');
        const label = children[0];
        const name = children[1];
        const id = name.id;
        const type = id.slice(id.search('inputNameEl') + 11);

        const prop = {
            type,
            name: name.value,
            label: label.value,
        };

        if (prop.label && prop.name && type) dynamicFieldProps.push(prop);
    });

    return dynamicFieldProps;
}

function createDynamicFields(dynamicFieldProps, form) {
    const dynamicField = document.createElement('div');
    dynamicField.className = 'dynamicField';

    const remBttn = document.createElement('button');
    remBttn.className = 'remBttn';
    remBttn.textContent = 'Remove';
    remBttn.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentElement.remove();
    });

    const fragment = document.createDocumentFragment();
    dynamicFieldProps.forEach((prop) => {
        fragment.appendChild(createDynamicEl(prop));
    });

    dynamicField.appendChild(fragment);
    dynamicField.appendChild(remBttn);
    form.appendChild(dynamicField);
}

function createDynamicEl(props) {
    const el = document.createElement('div');
    el.className = 'dynamicFieldEl';

    const labelEl = document.createElement('label');
    labelEl.textContent = props.label;
    labelEl.setAttribute('for', props.name);

    const inputEl = document.createElement('input');
    inputEl.type = props.type;
    inputEl.id = props.name;
    inputEl.name = props.name;

    el.appendChild(labelEl);
    el.appendChild(inputEl);

    return el;
}
