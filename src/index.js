console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
const dogHouse = document.getElementById("dog-image-container")
const fullList = document.getElementById("dog-breeds")
const sorter = document.getElementById("breed-dropdown")

sorter.addEventListener("change", (e)=>{
    sortThoseLads(e.target.value)
})
function initialize(){
      retrieveTheBoys(`${imgUrl}`)
      everyKindOfDog(`${breedUrl}`)
}

function retrieveTheBoys(url){
    fetch(`${url}`)
    .then((res)=>{ return res.json()})
    .then((data)=>{
        showMeTheDogs(data.message)
    })
}

function everyKindOfDog(url){
    fetch(`${url}`)
    .then((res)=>{ return res.json()})
    .then((data)=>{
        let dogArr = makeDogArray(data.message)
       dogListMaker(dogArr)
    })
}

function makeDogArray(obj)
{
    let listArr = []
    for(breed in obj){
        listArr.push(breed)
    }

    return listArr
}
function dogListMaker(dogs){

    fullList.innerHTML=""

     dogs.forEach((breed)=>{
            let newLi = document.createElement("li")
            newLi.innerText=`${breed}`
            newLi.addEventListener("click", ()=>{
                newLi.style="color:blue"
            })
            fullList.append(newLi)
        })
    }

function showMeTheDogs(dogArr){
    dogArr.forEach((dogImg)=>{
        let newImg = document.createElement("img")
        newImg.src=`${dogImg}`
        dogHouse.append(newImg)
    })
}

function sortThoseLads(char){


    fetch(`${breedUrl}`)
    .then((res)=>{ return res.json()})
    .then((data)=>{
        let dogList = []

        for(let breed in data.message){
            dogList.push(breed)
        }

        let filteredList = dogList.filter((e) => e.startsWith(char))
        dogListMaker(filteredList)
    })

}
initialize()