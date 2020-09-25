class Ui{
    constructor (){
        this.money_input = document.querySelector('.money_input');
        this.money_btn = document.querySelector('.money_btn');
        this.show_money = document.querySelector('.money_value');
        this.show_extant = document.querySelector('.extant_value');
        this.add_extend = document.querySelector('.expend_btn');
        this.name = document.querySelector('.expend_input--title')
        this.expend_value = document.querySelector('.expend_input--value')
        this.factore = document.querySelector('.factore_extends')
        this.extant_value = document.querySelector('.money_value')
        this.extend_value = document.querySelector('.extend_value')
        this.extends = [];
        this.id = 0;
    }

    add_money(){
        const money = this.money_input.value;
        this.show_money.textContent=money;
        this.extant();
        this.money_input.value = '';
    }

    extant() {
        const extantvalue = this.calcute_extant();
        this.show_extant.textContent = extantvalue;
    }

    calcute_extant(){
        const extend = this.extend();
        const money =parseInt( this.extant_value.textContent);
        return (money - extend);
    }

    extend() {
       const total =  this.extends.reduce((pre,crr) => {
           return pre = parseInt(crr.value)+pre;
        },0)
        this.extend_value.textContent = total
        return total
    }

    addextend() {
        const name = this.name.value;
        const value = this.expend_value.value;
         this.id++
         const detail = {
             id:this.id,
             name:name,
             value:value,
         }
         const div = document.createElement('div');
         div.classList.add('factore_extends--item');
         div.id = this.id
         div.innerHTML=`
         <div class="factore_extends--item-name" id="${this.id}">${name}</div>
         <div class="factore_extends--item-value">${value}</div>
         <div class="factore_extends--item-icons">
             <i class="factore_extends--item-icon fas fa-edit"></i>
             <i class="factore_extends--item-icon fas fa-trash"></i>
         </div>
         `
         this.factore.appendChild(div)
         this.extends.push(detail)

         this.extant();
         this.name.value='';
         this.expend_value.value= '';
    }

    icons_click(event){
        if(event.target.classList.value.includes('fa-edit')){

            //remove from dom
            const select = event.target.parentElement.parentElement;
            const name = select.children[0].textContent
            const value =parseInt(select.children[1].textContent) 
            this.name.value = name;
            this.expend_value.value = value;
            this.factore.removeChild(select);

            // remove from list
            const newextend = this.extends.filter((item) => item.id != select.id)
            this.extends = newextend
            this.extant()
        }else if(event.target.classList.value.includes('fa-trash')){
            //remove from dom
            const select = event.target.parentElement.parentElement;
            this.factore.removeChild(select);

            // remove from list
            const newextend = this.extends.filter((item) => item.id != select.id)
            this.extends = newextend
            this.extant()
        }
        
    }
}

const ui = new Ui
ui.money_btn.addEventListener('click' , () => {
    ui.add_money()
});

ui.add_extend.addEventListener('click' , () => ui.addextend())

ui.factore.addEventListener('click' , (event) => ui.icons_click(event))