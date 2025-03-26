//anomaly here in chrome
// const API= "https://fakeresponder.com/?sleep=3000";
// async function f(){
//     const d= await fetch(API);
//     console.log(d)
//     return d;
// }
// const user= f();
// console.log(user)

function fetchMemes(){
    return new Promise(function(resolve,reject){
        const meme= fetch("https://api.imgflip.com/get_memes");
        
        // resolve(meme)
        reject("e")
    })
}
fetchMemes().then(meme=>{
    return meme.json();
    // throw new Error("not");
}).catch(err=>{
    console.log(err);
    return Promise.reject("hy");
}).then(meme=>console.log(meme))