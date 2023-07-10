
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}


function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}



    function searchPeopleDataSet(people) {

        const searchTypeChoice = validatedPrompt(
            'Please enter in what type of search you would like to perform.',
            ['id', 'name', 'traits']
        );

        


        
        let results = [];
        let userInput = "";
        switch (searchTypeChoice) {
            case 'id':
                results = searchById(people);
                break;
            case 'name':
                results = searchByName(people);
                break;
            case 'traits':
                do{
                    results = traitFunction(people);
                    userInput = prompt("Do you want to continue (y or n)");
                    people = results;
                }while(userInput.toLowerCase() === "y");
                break;
            default:
                return searchPeopleDataSet(people);
        }
        return results;
    }
    
function traitFunction(people){
        const searchTypeTraitChoice = validatedPrompt(
            'Please enter in what type of search you would like to perform.',
            ['height', 'weight', 'occupation', 'gender', 'eye color']
        );

        switch (searchTypeTraitChoice) {
            case 'height':
                results = searchByHeight(people);
                return results;
            case 'weight':
                results = searchByWeight(people);
                return results;
            case 'occupation':
                results = searchByOccupation(people);
                return results;
            case 'gender':
                results = searchByGender(people);
                return results;
            case 'eye color':
                results = searchByEyeColor(people);
                return results;
        }


}

//function searchByTrait(gender = null, weight = null, occupation = null, height = null, eyeColor = null){};
function searchByHeight(people){
    const heightToSearchFor = parseInt(prompt('Please enter the height of the person you are searching for.'));
    const heightSearchResults = people.filter(person => (person.height === heightToSearchFor));
    return heightSearchResults;
}
function searchByWeight(people){
    const weightToSearchFor = parseInt(prompt('Please enter the weight of the person you are searching for.'));
    const weightSearchResults = people.filter(person => (person.weight === weightToSearchFor));
    return weightSearchResults;
}
function searchByOccupation(people){
    const occupationToSearchFor = prompt('Please enter the occupation of the person you are searching for.');
    const occupationSearchResults = people.filter(person => (person.occupation.toLowerCase() === occupationToSearchFor.toLowerCase()));
    return occupationSearchResults;
}
function searchByGender(people){
    const genderToSearchFor = prompt('Please enter the gender of the person you are searching for.');
    const genderSearchResults = people.filter(person => (person.gender.toLowerCase() === genderToSearchFor.toLowerCase()));
    return genderSearchResults;
}
function searchByEyeColor(people){
    const eyeColorToSearchFor = prompt('Please enter the eye color of the person you are searching for.');
    const eyeColorSearchResults = people.filter(person => (person.eyeColor.toLowerCase() === eyeColorToSearchFor.toLowerCase()));
    return eyeColorSearchResults;
}



function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}


function displayPersonInfo(person){
    let stringPersonInfo = ""
    for (const [key, value] of Object.entries(person)){
        stringPersonInfo += `${key}: ${value}\n`;
        console.log(`${key}: ${value}`);
    }
    alert(stringPersonInfo)
}

//1. take full data set and filter (filter method)
//2. check id of each person in people array by found person(person parameter) 
//   parents id (includes method)
function siblingsSearchResults(person, people){
    let siblings = [];
    const parentSearchResults = people.filter(per => (person.parents.includes(per.id)));
        
    for (p of people){
        if (p.parents.includes(parentSearchResults[0].id)){
            siblings.push(...[p])
        }
    }
    const newSiblingSearchResults = siblings.filter(s => (s !== person));
    return newSiblingSearchResults;
}

// function displayRelationships(prefix, searchResults){
//     let relationships = [];
//     for (object of searchResults){
//         relationships += [prefix + " " + searchResults[object]]
//     }
//     return relationships
// }



function findParents(person, people){
    const parentSearchResults = people.filter(per => (person.parents.includes(per.id)));
    return parentSearchResults;
}

function findSpouse(person, people){
    const spouseSearchResults = people.filter(per => (person.currentSpouse === per.id));
    return spouseSearchResults;
}

function findPersonDescendants(person, people){
    const childrenSearchResults = people.filter(per => (per.parents.includes(person.id)));
    let descendants = childrenSearchResults
    for (i = 0; i < childrenSearchResults.length; i++){
    //const grandChildrenSearchResults = people.filter(per => (per.parents.includes(childrenSearchResults[i].id)))
        for (p of people){
            if (p.parents.includes(childrenSearchResults[i].id)){
                descendants.push(...[p])
            }
        }
    }
    return descendants;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            let personParents = findParents(person, people);
            displayPeople('Parents', personParents);
            let personSpouse = findSpouse(person, people);
            displayPeople('Spouse', personSpouse);
            let personSiblings = siblingsSearchResults(person, people);
            displayPeople('Siblings', personSiblings);
            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
    //people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase()));
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}