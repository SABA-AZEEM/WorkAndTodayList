
window.onload = function () {
    // Your JavaScript code here
    const checkboxEl=document.querySelectorAll('.checkbox');
    const readEl=document.querySelectorAll('.read')
    checkboxEl.forEach((item,idx)=>{
        item.addEventListener('change',async()=>{
            if(item.checked){
                    readEl[idx].classList.add('read-input');
                    const result=await fetch(`/delApi?item=${item.value}`);  
                    if (result.ok) {
                        // Remove the task from the DOM if the server confirms deletion
                        readEl[idx].parentElement.remove();
                    }
                     else {
                    readEl[idx].classList.remove('read-input');
                    }
                    
            }else{
                    readEl[idx].classList.remove('read-input');
            }
            });
    })
};



//for render page
document.querySelector('.today').addEventListener('click',()=>{
    window.location.href='/';
})
document.querySelector('.work').addEventListener('click',()=>{
    window.location.href='/work';
})