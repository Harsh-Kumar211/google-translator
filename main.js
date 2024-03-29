let langoption=document.querySelectorAll('select');
let fromtext=document.querySelector('.fromtext');
let transtext=document.querySelector('.totranslate')
let fromVoice=document.querySelector('.from');
let tovoice=document.querySelector('.to');
let cpy=document.querySelector('.bx-copy')
let count=document.querySelector('.code_length');
let exchange=document.querySelector('.bx-transfer')
langoption.forEach((get, con)=>{
    for(let countrycode in language){

        let selected;
        if(con==0&&countrycode=="en-GB"){
            selected="selected"
        }
        else if(con==1&&countrycode=="hi-IN"){
            selected="selected";
        }

        let option =`<option value="${countrycode}" ${selected}>${language[countrycode]}</option>`;
        get.insertAdjacentHTML('beforeend',option);
    }
})

fromtext.addEventListener('input',function(){
    let content=fromtext.value;
    fromContent=langoption[0].value;
    transContent=langoption[1].value;

    let transLINK=`https://api.mymemory.translated.net/get?q=${content}-&langpair=${fromContent}|${transContent}`;


    fetch(transLINK).then(translate=>translate.json()).then(data=>{
       transtext.value=data.responseData.translatedText;
    })
})

fromVoice.addEventListener('click',function(){
    let fromtalk;
    fromtalk=new SpeechSynthesisUtterance(fromtext.value);
    fromtalk.lang=langoption[0].value;
    speechSynthesis.speak(fromtalk)
})

tovoice.addEventListener('click',function(){
    let totalk;
    totalk=new SpeechSynthesisUtterance(transtext.value);
    totalk.lang=langoption[1].value;
    speechSynthesis.speak(totalk)
})

cpy.addEventListener('click',function(){
    navigator.clipboard.writeText(transtext.value);
})

fromtext.addEventListener('keyup',function(){
    count.innerHTML=`${fromtext.value.length}/5,000`
})

exchange.addEventListener('click',function(){
    let temp=fromtext.value;
    fromtext.value=transtext.value;
    transtext.value=temp;

    let tempoto=langoption[0].value;
    langoption[0].value=langoption[1].value;
    langoption[1].value=tempoto;
})