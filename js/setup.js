'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

//функция генерации случайных данных для похожих волшебников с уникальными именем и фамилией

var getWizards = function () {
    var wizards = [];

    var dataWizards = {
        count: 4, // должно быть всегда меньше или равно чем количество имен и фамилий в сумме
        names: ["Иван", "Хуан Себастьян", "Мария", "Кристоф", "Виктор", "Юлия", "Люпита", "Вашингтон"],
        surnames: ["да Марья", "Верон", "Мирабелла", "Вальц", "Онопко", "Топольницкая", "Нионго", "Ирвинг"],
        coatColors: ["rgb(101, 137, 164)", "rgb(241, 43, 107)", "rgb(146, 100, 161)", "rgb(56, 159, 117)", "rgb(215, 210, 55)", "rgb(0, 0, 0)"],
        eyesColors: ["black", "red", "blue", "yellow", "green"],
        getRandomElement: function (array) {
            var randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        },

        getRandomData: function () {
            var randomWizard = {};
            randomWizard.name = this.getRandomElement(this.names) + " " + this.getRandomElement(this.surnames);
            randomWizard.coatColor = this.getRandomElement(this.coatColors);
            randomWizard.eyesColor = this.getRandomElement(this.eyesColors);
            return randomWizard;
        }

    };
    // wizards.push(dataWizards.getRandomData());//необходимо для первого варианта
    while (wizards.length < dataWizards.count) {
        var wizardsElement = dataWizards.getRandomData();
        // начало первого варианта
        // var isContains = false
        // for(var wizard in wizards) {
        //     if(wizard.name === wizardsElement.name) {
        //         isContains = true;
        //     }
        // }
        // if(!isContains) {
        //     wizards.push(wizardsElement)
        // }
        //конец первого варианта
        //начало второго варианта
        if (wizards.every(function (wizard)  { return wizard.name !== wizardsElement.name })) {
            wizards.push(wizardsElement)
        }
        //конец второго варианта
    }
    return wizards;
};

//функция создания DOM-элемента на основе JS-объекта

var createWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
};

//функция заполнения блока DOM-элементами на основе массива JS-объектов и показ заполненного блока

var renderWizards = function () {
    var similarListElement = document.querySelector('.setup-similar-list');
    var similarWizards = getWizards();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < similarWizards.length; i++) {
        fragment.appendChild(createWizard(similarWizards[i]));
    }
    // similarWizards.forEach(function (wizard) { fragment.appendChild(createWizard(wizard))}) // алтернатива для предыдущего цикла
    // similarWizards.forEach((wizard) => fragment.appendChild(createWizard(wizard))) // алтернатива для предыдущего цикла

    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
}();












