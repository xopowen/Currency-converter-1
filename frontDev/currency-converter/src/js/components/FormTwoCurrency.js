import {changeFlagImg} from "../main";

export class FormTwoCurrency {
    /**
     *
     * @param {HTMLFormElement} form
     * @param settingTwoCurrency
     */
    constructor(form,settingTwoCurrency) {
        this._form = form
        this._setting = settingTwoCurrency

        this._left = this._form.querySelector('#two-currency-left')
        this.leftbtn = this._left.querySelector('button')

        this._right = this._form.querySelector('#two-currency-right')
        this.rightBtn = this._right.querySelector('button')

        this._outPut = this._form.querySelector('[data-output]')
        this._outPutCurrancyName = this._form.querySelector('[data-currency]')
        this._input = this._form.querySelector('input')

        this._input.addEventListener('input',()=>{
           setTimeout(()=>{
               this._initOutPut()
           },0)
        })

        this.initLeft()
        this.initRight()
        this._swapBtn = this._form.querySelector('#btn-two-currency-swap')
        this._swapBtn.addEventListener('click',this._toSwap)

    }

    set leftInfo({name,value,attitudeDollar,flagImg}){
        this._setting.left = {name,value,attitudeDollar,flagImg}
        this.initLeft()
    }
    set rightInfo({name,value,attitudeDollar,flagImg}){
        this._setting.right = {name,value,attitudeDollar,flagImg}
        this.initRight()
    }

    get leftInfo(){
        return this._setting.left
    }
    get rightInfo(){
        return this._setting.right
    }

    get inputField(){
        return this._input
    }

    _toSwap =  ()=>{
        let buffer = Object.assign({}, this._setting.left)
        this.leftInfo = this._setting.right
        this.rightInfo = buffer
    }

    initLeft(){
        this._left.info = this._setting.left
        let img = this._left.querySelector('img')
        this.leftbtn.textContent = this._left.info.name

        if(img){
            img.alt = this._left.info.name
            img.src = this._left.info.flagImg
            img.title = this._left.info.name

        }
        this._initOutPut()
    }
    initRight(){
        this._right.info = this._setting.right
        let img = this._right.querySelector('img')
        this.rightBtn.textContent = this._right.info.name
        if(img){
            img.alt = this._right.info.name
            img.src = this._right.info.flagImg
            img.title = this._right.info.name

        }
        this._outPutCurrancyName.textContent = this._right.info.name
        this._initOutPut()
    }
    _initOutPut(){
        this._outPut.dataset.value =  `${+this._input.dataset.value * this._setting.left.attitudeDollar / this._setting.right.attitudeDollar}`
        this._outPut.dispatchEvent(new  MouseEvent('input'))
    }



}