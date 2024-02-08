
const enumSeparator = {
    point:'point',
    comma:'comma',
    commaPoint:'comma-point',
    pointComma:'point-comma',
    getSeparator:function (name) {
        if(name === this.point  || this.commaPoint === name){
            return'.'
        }
        if(name === this.comma || this.pointComma === name){
            return ','
        }
        return ''
    }
}




export class OutputController{

    /**
     *
     * @param defaultSetting
     */
    constructor(defaultSetting) {
        this._setting = defaultSetting
        this.observedElements = []
        this._defaultSetting = defaultSetting;
    }

    get setting() {
        return this._setting;
    }

    set setting(value) {
        this._setting = value;
        this._formatValueForObservers()
    }

    _formatValueForObservers(){
        this.observedElements.forEach(el=>{
            switch (el.tagName.toLowerCase()){
                case 'input':
                    el.setAttribute('value',this.formatOutput(+el.dataset.value))
                    el.value = this.formatOutput(+el.dataset.value)
                    break;
                default:
                    el.textContent = this.formatOutput(+el.dataset.value)
            }

        })
    }

    /**
     *
     * @param {MouseEvent} e
     * @private
     */
    _inputField = (e)=>{
        let positionCursor = e.target?.selectionStart
        let oldStr = e.target.value
        let separator = enumSeparator.getSeparator(this._setting.separator)
        //поведение при удалении разделителя
        if(+this._setting.rounding>0 && oldStr.indexOf(separator)===-1){
            oldStr = oldStr.split('')
            oldStr.splice(-this._setting.rounding,0,separator)
            oldStr = oldStr.join('')
        }

        if(e.target.value!==''){

            let num = this.fromStrToNumber(oldStr)
            e.target.dataset.value = num +""
            e.target.value = this.formatOutput(num)
            e.target.setAttribute('value',this.formatOutput(num))
        }
        e.target.selectionStart = positionCursor
        e.target.selectionEnd = positionCursor
    }
    /**
     *
     * @param {MouseEvent} e
     * @private
     */
    _inputForTextEl = (e)=>{
        e.currentTarget.textContent = this.formatOutput(+e.currentTarget.dataset.value)
    }
    /**
     * @description добавляем элемент которые будет отслеживаться.
     * добавляем прослушивали событий на элементы в зависимости от их texName.
     * важно отслеживаемый элемент должен иметь dataset.value для корректной работы
     * так как именно оттуда будут браться данные для формирования данных согласно настойкам
     * @param {HTMLInputElement|HTMLElement} el
     */
    addObservedEl(el){
        if(this.observedElements.includes(el)){
            return
        }
        switch (el.tagName.toLowerCase()){
            case 'input':
                el.setAttribute('value',this.formatOutput(+el.dataset.value))
                el.addEventListener('input',this._inputField)
                break;
            default:
                el.textContent = this.formatOutput(+el.dataset.value)
                el.addEventListener('input',this._inputForTextEl)
        }
        this.observedElements.push(el)
    }


    /**
     *@description форматирует число согласно настройка заданным в #form-settings-theme
     * @param {Number} n
     * @return {string}
     */
    formatOutput(n){
        let formatter =  new Intl.NumberFormat("ru", {
            minimumFractionDigits: this._setting.rounding !== undefined ? +this._setting.rounding : 2,
            maximumFractionDigits:this._setting.rounding !== undefined ? +this._setting.rounding : 2,
        });
        let ret =  formatter.format(n)
        switch (this._setting.separator){
            case enumSeparator.point:
                ret = ret.replace(',','.')
                break;
            case enumSeparator.comma:
                break;
            case enumSeparator.commaPoint:
                ret = ret.replace(',','.')
                ret = ret.replaceAll(/\s/g,',')
                break;
            case enumSeparator.pointComma:
                ret = ret.replaceAll(/\s/g,'.')
                break;
        }
        return ret
    }

    /**
     * @description получение число из строки отформатированной formatOutput
     * @param str
     * @return number
     */
    fromStrToNumber(str){
        let ret =  str
        switch (this._setting.separator){
            case enumSeparator.point:
                break;
            case enumSeparator.comma:
                ret = ret.replace(',','.')
                break;
            case enumSeparator.commaPoint:
                ret = ret.replaceAll(',','')
                break;
            case enumSeparator.pointComma:
                ret = ret.replaceAll('.','').replace(',','.')
                break;
        }
        ret = ret.replaceAll(/\s/g,'')
        return +ret
    }

}

