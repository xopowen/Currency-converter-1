import {classTokenConst} from "../main";

/**
 *
 * @param {HTMLElement} container
 * @param {{name:string,attitudeDollar:number,flagImg:string}} infoCurrency
 * @return {HTMLElement|undefined}
 */
function addCurrencyEl(container,infoCurrency){
    let template = container.querySelector('[hidden]')
    if(template){
        let copy = template.cloneNode(true)
        copy.hidden = false
        copy.removeAttribute('style')
        let img = copy.querySelector('img')
        let p  = copy.querySelector('p[title]')

        if(img){
            img.src = infoCurrency.flagImg
            img.alt = infoCurrency.name
            img.title = infoCurrency.name
        }
        if(p){
            p.title = infoCurrency.name
            p.textContent = infoCurrency.name
        }
        return copy
    }

}


export class FormAddCurrency{


    constructor(form,listCurrency) {
        this._form = form
        this._listCurrency = listCurrency
        this._callback = ()=>{}
        this._filter = ()=>{return true}
        this._listLi = []
        this._filFrom()
        this._searchInit()
    }

    /**
     *
     * @param {Array<{}>} value
     */
    set listCurrency(value){
        this._listCurrency = value
        let difference =  this._listLi.filter(li=>value.findIndex(el=>el.name===li.info.name) === -1 )
        difference.forEach(el=>el.remove())
    }


    /**
     * @description назначает обработчик события input на search элемент.
     * филетирует значения на основе name.
     * нет чувствительности к регистру
     * @private
     */
    _searchInit(){
        let search = this._form.querySelector('#form-search')
        if(search){
            search.addEventListener('input',(e)=>{
                this._listLi
                    .forEach(li=>{
                        if(!li?.info?.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ){
                            if(!li.classList.contains(classTokenConst.hiddenItemLiCurrency)){
                                li.classList.add(classTokenConst.hiddenItemLiCurrency)
                            }
                        }else{
                            li.classList.remove(classTokenConst.hiddenItemLiCurrency)
                        }
                    })
            })
        }else{
            throw 'search not find'
        }
    }

    /**
     *
     * @param {Function} value
     */
    set callback(value){
        this._callback = value
    }

    _callBack = (e)=>{
        this._callback(e)
    }

    _filFrom(){
        let ul = this._form.querySelector('ul')
        this._listCurrency.map(info=>{
            if(this._listLi.findIndex(li=>li.info.name===info.name)!==-1){
                return
            }

            let el = addCurrencyEl(ul,info)
            if(el){
                el.addEventListener('click',this._callBack )
                ul.append(el)
                el.info = info
                this._listLi.push(el)
            }else{
                throw 'error info in _filFrom'
            }

        })
    }

    set filter(value) {
        this._listLi.filter(el=>{
            el.classList.remove(classTokenConst.mainHiddenItemLiCurrency)
        })
        this._filter = value;
        this._listLi.filter(this._filter).forEach(el=>{
          if(!el.classList.contains(classTokenConst.mainHiddenItemLiCurrency)){
              el.classList.add(classTokenConst.mainHiddenItemLiCurrency)
          }
        })
    }



}