const inputElement = document.getElementById("num");
const btn=document.getElementById("renderNum");

if(inputElement){
    inputElement.addEventListener("change",function(e){
        const inputValue = e.target.value;
        if(inputValue<1){
            e.target.value=1;
        }else if(inputValue>30){
            e.target.value=30;
        }
    })
}
if(btn){
    btn.addEventListener("click",function(){
        // console.dir(inputElement.)
        // ;
        const range=inputElement.value;
        // const arr=new Array(range);
        // console.log(arr);
        // arr.forEach((_,index)=>{
        //     const p = document.createElement("p");
        //     p.innerText=index+1;
        //     document.body.appendChild(p);
        // })
        document.createDocumentFragment();
        for(let i=1;i<=range;i++){
            const p = document.createElement("p");
            p.innerText=i;
            document.body.appendChild(p);            
        }
    })
}