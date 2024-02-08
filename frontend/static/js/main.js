/******/ (function() { // webpackBootstrap
    /******/ 	"use strict";
    /******/ 	var __webpack_modules__ = ({

        /***/ 813:
        /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   c: function() { return /* binding */ FormAddCurrency; }
                /* harmony export */ });
            /* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(693);


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


            class FormAddCurrency{


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
                                        if(!li.classList.contains(_main__WEBPACK_IMPORTED_MODULE_0__/* .classTokenConst */ .P.hiddenItemLiCurrency)){
                                            li.classList.add(_main__WEBPACK_IMPORTED_MODULE_0__/* .classTokenConst */ .P.hiddenItemLiCurrency)
                                        }
                                    }else{
                                        li.classList.remove(_main__WEBPACK_IMPORTED_MODULE_0__/* .classTokenConst */ .P.hiddenItemLiCurrency)
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
                        el.classList.remove(_main__WEBPACK_IMPORTED_MODULE_0__/* .classTokenConst */ .P.mainHiddenItemLiCurrency)
                    })
                    this._filter = value;
                    this._listLi.filter(this._filter).forEach(el=>{
                        if(!el.classList.contains(_main__WEBPACK_IMPORTED_MODULE_0__/* .classTokenConst */ .P.mainHiddenItemLiCurrency)){
                            el.classList.add(_main__WEBPACK_IMPORTED_MODULE_0__/* .classTokenConst */ .P.mainHiddenItemLiCurrency)
                        }
                    })
                }



            }

            /***/ }),

        /***/ 905:
        /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   R: function() { return /* binding */ FormTwoCurrency; }
                /* harmony export */ });
            /* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(693);


            class FormTwoCurrency {
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

            /***/ }),

        /***/ 515:
        /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   b: function() { return /* binding */ MainForm; }
                /* harmony export */ });
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


            class MainForm{

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

            /***/ }),

        /***/ 959:
        /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   k: function() { return /* binding */ OutputController; }
                /* harmony export */ });

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




            class OutputController{

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



            /***/ }),

        /***/ 693:
        /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   P: function() { return /* binding */ classTokenConst; }
                /* harmony export */ });
            /* harmony import */ var _components_OutputController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(959);
            /* harmony import */ var _components_FormAddCurrency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(813);
            /* harmony import */ var _components_MainForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(515);
            /* harmony import */ var _components_FormTwoCurrency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(905);





            const nav = {
                btnMain:document.getElementById('btn-frog'),
                btnCleaner:document.getElementById('btn-cleaner'),
                btnBurger:document.getElementById('btn-burger'),
                btnLang:document.getElementById('btn-lang'),
                btnGear:document.getElementById('btn-gear'),
                btnAddCurrency:document.getElementById('btn-add-currency')
            }
            const pages = {
                main:document.getElementById('main_currency-converter'),
                addCurrency:document.getElementById('form-add-currency'),
                twoCurrencyConverter:document.getElementById('two-currency-convert'),
                offerUnblock:document.getElementById('offer-unblock'),
                settingsOutput:document.getElementById('settings-output'),
                settingsTheme:document.getElementById('settings-theme')
            }

            const classTokenConst = {
                showPage:'converter__main_show',
                hiddenItemLiCurrency:'currency__item_hidden',
                mainHiddenItemLiCurrency:'currency__item_main-hidden'
            }

            let storyInfo = {
                listCurrency:[
                    {name:'USD',value:1,attitudeDollar:1,flagImg:'./static/img/FLAG USD.jpg'},
                    {name:'RUB',value:1,attitudeDollar:0.012,flagImg:'./static/img/FLAG RUB.jpg'}
                ],
                listTheme:[{name:'dark',img:''}],
                output:{
                    separator:'point',
                    rounding:'2'
                },
                activeTheme:'dark',
                activePageID:'main_currency-converter',
                listCurrencyMainForm:[  ],
                twoCurrency: {
                    left:{name:'RUB',value:0,attitudeDollar:0.012,flagImg:'./static/img/FLAG RUB.jpg'},
                    right:{name:'USD',value:0,attitudeDollar:1,flagImg:'./static/img/FLAG USD.jpg'}
                }
            }


            class ExtensionCurrencyConverter{

                constructor() {
                    this._nav = nav
                    this._pages = pages

                    this._setting = storyInfo
                    this._outputContoller = new _components_OutputController__WEBPACK_IMPORTED_MODULE_0__/* .OutputController */ .k(this._setting.output)

                    this._activePage =  pages.main
                    this._activePage.classList.add(classTokenConst.showPage)

                    this._controlElements = {
                        formSettingsTheme: document.getElementById('form-settings-theme'),
                        formListCurrency:document.getElementById('form-list-currency'),
                        formSettingsOutput:document.getElementById('form-setting-output'),
                        formTwoCurrency:document.getElementById('form-two-currency-converter'),
                        formAddCurrency:document.getElementById('form-add-currency')
                    }

                    this._formAddCurrency = new _components_FormAddCurrency__WEBPACK_IMPORTED_MODULE_1__/* .FormAddCurrency */ .c(this._controlElements.formAddCurrency, this._setting.listCurrency)
                    this._mainForm = new _components_MainForm__WEBPACK_IMPORTED_MODULE_3__/* .MainForm */ .b(this._controlElements.formListCurrency,
                        this._setting.listCurrencyMainForm,
                        this._changeCurrencyMainFrom
                    )
                    this._formTwoCurrency = new _components_FormTwoCurrency__WEBPACK_IMPORTED_MODULE_2__/* .FormTwoCurrency */ .R(this._controlElements.formTwoCurrency, this._setting.twoCurrency)

                    this._navInit()
                    this._controlOutputSetting()
                    this._controlThemeSetting()

                    this._nav.btnAddCurrency.addEventListener('click',this._addCurrencyMainForm)

                    //добавляем все поля где важно отображать числа в правильном формате в _outputContoller
                    document.body.querySelectorAll('[data-output]').forEach(el=>{
                        this._outputContoller.addObservedEl(el)
                    })
                    this._mainForm.listField.forEach(field=>{
                        this._outputContoller.addObservedEl(field.querySelector('input'))
                        //обработка события замены валюты
                        let btn = field.querySelector('button')
                        if(btn){
                            btn.info = field.info
                            btn.addEventListener('click',this._changeCurrencyMainFrom)
                        }
                    })
                    this._outputContoller.addObservedEl(this._formTwoCurrency.inputField)

                    this._formTwoCurrency.leftbtn.addEventListener('click',this._changeTwoCurrencyFormLeft)
                    this._formTwoCurrency.rightBtn.addEventListener('click',this._changeTwoCurrencyFormRight)

                    //save change
                    Object.entries(this._controlElements).forEach(item=>{
                        item[1].addEventListener('change',()=>{
                            setTimeout(()=>this.saveSettings(),0)
                        })
                    })
                    this.getSavedInfo()
                }

                _addCurrencyMainForm = ()=>{
                    this.activePage = this._pages.addCurrency
                    //фильтр по которому будут отфильтрованный элементы при первом появлении
                    this._formAddCurrency.filter = (el)=>{
                        //вернёт эламиты, которые есть на главном экране
                        return  this._mainForm.listField
                            .find(field=>field.info.name === el?.info?.name) !== undefined
                    }
                    this._formAddCurrency.callback = (e)=>{
                        let isInMain =  this._setting.listCurrencyMainForm.find((el)=>el.name===e.currentTarget?.info)
                        if(!isInMain){
                            let field = this._mainForm.addField(Object.assign({},e.currentTarget?.info))
                            if(field){
                                this._outputContoller.addObservedEl(field.querySelector('input'))
                            }

                            this.activePage = this._pages.main
                        }
                    }
                }
                _changeCurrencyMainFrom = (event)=>{
                    this.activePage = this._pages.addCurrency
                    //фильтр по которому будут отфильтрованный элементы при первом появлении
                    this._formAddCurrency.filter = (el)=>{
                        //вернёт эламиты, которые есть на главном экране
                        return  this._mainForm.listField
                            .find(field=>field.info.name === el?.info?.name) !== undefined
                    }
                    this._formAddCurrency.callback = (e)=>{
                        this._mainForm.changeField(
                            this._mainForm.listField.find(f=>f.contains(event.target)).info.name ,
                            Object.assign({},e.currentTarget.info))
                        this.activePage = this._pages.main
                    }
                }

                _changeTwoCurrencyFormLeft = (event)=>{
                    this.activePage = this._pages.addCurrency
                    //фильтр по которому будут отфильтрованный элементы при первом появлении
                    this._formAddCurrency.filter = (el)=>{
                        //вернёт эламиты, информация о которых уже в форме
                        return  this._formTwoCurrency.leftInfo.name === el?.info?.name &&
                            this._formTwoCurrency.rightInfo.name === el?.info?.name
                    }
                    this._formAddCurrency.callback = (e)=>{
                        this._formTwoCurrency.leftInfo = Object.assign(this._formTwoCurrency.leftInfo,e.currentTarget.info)
                        this.activePage = this._pages.twoCurrencyConverter
                    }
                }
                _changeTwoCurrencyFormRight = (event)=>{
                    this.activePage = this._pages.addCurrency
                    //фильтр по которому будут отфильтрованный элементы при первом появлении
                    this._formAddCurrency.filter = (el)=>{
                        //вернёт эламиты, информация о которых уже в форме
                        return  this._formTwoCurrency.leftInfo.name === el?.info?.name &&
                            this._formTwoCurrency.rightInfo.name === el?.info?.name
                    }
                    this._formAddCurrency.callback = (e)=>{
                        this._formTwoCurrency.rightInfo = Object.assign(this._formTwoCurrency.leftInfo,e.currentTarget.info)
                        this.activePage = this._pages.twoCurrencyConverter
                    }
                }

                _navInit(){
                    this._setNavToPage(this._nav.btnGear, this._pages.settingsOutput)
                    this._setNavToPage(this._nav.btnBurger, this._pages.settingsTheme)
                    this._setNavToPage(this._nav.btnMain,this._pages.main)
                    this._setNavToPage(this._nav.btnCleaner,this._pages.offerUnblock )
                    this._setNavToPage(this._nav.btnLang,this._pages.twoCurrencyConverter )
                    this._setNavToPage(this._nav.btnAddCurrency,this._pages.addCurrency)
                }
                _controlOutputSetting(){
                    this._controlElements.formSettingsOutput.addEventListener('change',(e)=>{
                        let formData = new FormData(e.currentTarget)
                        if(formData.get('rounding')  !== this._setting.rounding ||
                            formData.get('separator') !==  formData.get('separator')){
                            this._setting.output.rounding = +formData.get('rounding')
                            this._setting.output.separator = formData.get('separator')
                            this._outputContoller.setting = this._setting.output
                            e.currentTarget?.querySelector('[data-output]')?.dispatchEvent(new MouseEvent('input'))
                        }
                    })
                }
                _controlThemeSetting(){
                    this._controlElements.formSettingsTheme.addEventListener('change',e=>{
                        let themeName =  new FormData(e.currentTarget).get('theme')
                        if(themeName !=='lock'){
                            document.body.className = themeName+'-theme'
                            this._setting.activeTheme = themeName
                        }
                    })
                }
                /**
                 *
                 * @param {HTMLElement} button
                 * @param {HTMLElement} page
                 * @private
                 */
                _setNavToPage(button,page){
                    button.addEventListener('click',()=>{
                        this.activePage = page
                        this.saveSettings()
                    })
                }

                /**
                 *
                 * @param {HTMLElement} value
                 */
                set activePage(value) {

                    if(value !== this._activePage) {
                        this._activePage.classList.remove(classTokenConst.showPage)
                        value.classList.add(classTokenConst.showPage)
                        this._activePage = value
                    }
                }

                getSavedInfo(){
                    chrome.runtime.sendMessage({getSettings:true},response=>{
                        if(response?.listCurrency){
                            this._setting.listCurrency = response.listCurrency
                        }
                        if(response?.listCurrencyMainForm){
                            this._setting.listCurrencyMainForm = response.listCurrency
                            this._mainForm.listCurrencyMainForm =  response.listCurrency
                            this._mainForm.listField.forEach(field=>{
                                let input = field.querySelector('input')
                                this._outputContoller.addObservedEl(input)
                            })
                        }
                        if(response?.twoCurrency){
                            this._setting.twoCurrency = response.twoCurrency
                            this._formTwoCurrency.leftInfo = response.twoCurrency.left
                            this._formTwoCurrency.rightInfo = response.twoCurrency.right
                        }
                        if(response?.activePageID){
                            this.activePage = Object.entries(this._pages).find(item=>item[1].id===response.activePageID)[1]
                        }
                        if(response?.output){
                            this._setting.output = response.output
                            this._outputContoller.setting = response.output
                        }
                        if(response?.listTheme){
                            this._setting.listTheme = response.listTheme
                        }
                        if(response?.activeTheme){
                            document.body.className = response?.activeTheme+'-theme'
                            this._setting.activeTheme = response?.activeTheme
                        }
                    });
                }
                saveSettings(){
                    chrome.runtime.sendMessage({save:Object.assign(storyInfo,{
                            listCurrency: this._setting.listCurrency,
                            listTheme:this._setting.listTheme,
                            output:this._outputContoller.setting,
                            activeTheme: this._setting.activeTheme,
                            activePageID:this._activePage.id,
                            listCurrencyMainForm:this._mainForm.listCurrencyMainForm,
                            twoCurrency: {
                                left:this._formTwoCurrency.leftInfo,
                                right:this._formTwoCurrency.rightInfo
                            }
                        })});
                }

            }

            let converter = new ExtensionCurrencyConverter()


            /***/ })

        /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/ 		// Check if module is in cache
        /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
        /******/ 		if (cachedModule !== undefined) {
            /******/ 			return cachedModule.exports;
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = __webpack_module_cache__[moduleId] = {
            /******/ 			// no module.id needed
            /******/ 			// no module.loaded needed
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	!function() {
        /******/ 		// define getter functions for harmony exports
        /******/ 		__webpack_require__.d = function(exports, definition) {
            /******/ 			for(var key in definition) {
                /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/ 				}
                /******/ 			}
            /******/ 		};
        /******/ 	}();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	!function() {
        /******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
        /******/ 	}();
    /******/
    /************************************************************************/
    /******/
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module is referenced by other modules so it can't be inlined
    /******/ 	__webpack_require__(693);
    /******/ 	__webpack_require__(813);
    /******/ 	__webpack_require__(905);
    /******/ 	__webpack_require__(515);
    /******/ 	var __webpack_exports__ = __webpack_require__(959);
    /******/
    /******/ })()
;