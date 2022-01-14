const searchBtn = document.querySelector('.searchBtn');
let rowList;

searchBtn.addEventListener('click', filterName);

function filterName(e) {
    rowList = document.querySelectorAll('.taskTemplate');

    const searchName = document.querySelector('.searchInput').value.toLowerCase();

    if (searchName === "") {
        for (let i = 1; i < rowList.length; i++) {
            rowList[i].classList.remove('hidden');
        }
        return;
    }

    for (let i = 1; i < rowList.length; i++) {
        let rowName = rowList[i].querySelector('.stuName').innerText.toLowerCase();
        // let level = rowList[i].querySelector('.level').innerText.toLowerCase();
        // let ca = rowList[i].querySelector('.ca').innerText.toLowerCase();
        // let result = rowList[i].querySelector('.result').innerText.toLowerCase();

        if (searchName !== rowName) {
            rowList[i].classList.add('hidden');
            
        } 
        else {
            rowList[i].classList.remove('hidden');            
        }
    }
}