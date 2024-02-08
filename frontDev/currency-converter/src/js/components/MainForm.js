/**
 *
 * @description создаёт копию из формы шаблона и заполняет её данными
 * @param {HTMLElement} container
 * @param {{name:string,value:number,attitudeDollar:number,flagImg:string}}currency
 * @return {HTMLElement | undefined}
 */
function addCurrencyField(container,currency){
    let templateField = container.querySelector('[hidden]')

    if(templateField){
        let copy = templateField.cloneNode(true)
        copy.hidden = false
        copy.removeAttribute('style')
        let input = copy.querySelector('[data-input]')
        let btn = copy.querySelector('[data-btn]')
        let flag = copy.querySelector('[data-imgConainer]')
        if(input){
            input.name = currency.name
            input.dataset.attitudeDollar = currency.attitudeDollar + ''
            input.dataset.value = currency.value +''
            input.setAttribute('value',currency.value )
        }
        if(btn){
            btn.textContent = currency.name
        }
        if(flag){
            let img = flag.querySelector('img')
            img.src = currency.flagImg
            img.alt = currency.name
            img.title =  currency.name
        }
        copy.info = currency
        return copy
    }

}


export class MainForm{

    constructor(form,listCurrencyMainForm,funChangeField ) {
        this._funChangeField = funChangeField
        this._form = form
        this._listCurrency = listCurrencyMainForm
        //list field from the main form
        this._listField = []
        //событие при инициализации
        this._fillMainForm()
        this._mainValue = listCurrencyMainForm.length >0?listCurrencyMainForm[0].value :0 ;
        this.focusedInput=undefined;
    }

    set listCurrencyMainForm(value){
        this._listCurrency = value
        this._fillMainForm()
    }
    get listCurrencyMainForm( ){
        return this._listCurrency

    }
    _fillMainForm(){
        this._listCurrency.map(value => {
            let showedField = this._listField.find((fl)=>fl.info.name===value.name)
            if(showedField){
                let input = showedField.querySelector(`[name=${value.name}]`)
                input.value = value.value
                input.dispatchEvent(new MouseEvent('input'))
                return
            }
            this.addField(value)
        })

        let difference = this._listField.filter(field=>this._listCurrency.findIndex((item)=>item.name===field.info.name)===-1)
        difference.forEach(el=>{
            el.remove()
        })
    }

    addField(info){

        let cleanField =  addCurrencyField(this._form,info)

        if(cleanField){
            this._form.append(cleanField)
            this._listField.push(cleanField)
            let input = cleanField.querySelector('input')
            input.addEventListener('input',(e)=>{
                console.log('input')
                if(e.target === this.focusedInput){
                    setTimeout(()=>{
                        this.mainValue = e.target.dataset.value * e.target.dataset.attitudeDollar
                    })
                }
            })
            input.addEventListener('focus',(e)=>{
                this.focusedInput = e.target
            })
            input.addEventListener('blur',(e)=>{
                this.focusedInput = undefined;
            })
            let btn =  cleanField.querySelector('[data-btn]')
            if(btn){
                btn.addEventListener('click',this._funChangeField)
            }
        }
        return cleanField
    }

    set mainValue(value){
        this._mainValue = value
        this.listField.forEach(field=>{
            let input = field.querySelector('input')

            if(input !== this.focusedInput){
                input.setAttribute('value', `${this._mainValue / input.dataset.attitudeDollar}`)
                input.value = `${this._mainValue / input.dataset.attitudeDollar}`
                input.dataset.value = `${this._mainValue / input.dataset.attitudeDollar}`
                input.dispatchEvent(new MouseEvent('input'))
            }
        })
    }

    changeField(title,newInfo){
        let field = this._listField.find(el=>el?.info?.name === title)
        field.info = newInfo
        let input = field.querySelector('input')
        let btn = field.querySelector('[data-btn]')
        let img = field.querySelector('img')

        input.dataset.attitudeDollar =  newInfo.attitudeDollar
        input.name =  newInfo.name
        btn.textContent = newInfo.name
        img.src = newInfo.flagImg
        img.alt = newInfo.name
        img.title = newInfo.name

        field.dispatchEvent(new MouseEvent('change',{bubbles:true}))
    }

    get listField(){
        return this._listField
    }
}