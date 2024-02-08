import {OutputController} from "./components/OutputController";
import {FormAddCurrency} from "./components/FormAddCurrency";
import {MainForm} from "./components/MainForm";
import {FormTwoCurrency} from "./components/FormTwoCurrency";

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

export const classTokenConst = {
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
        this._outputContoller = new OutputController(this._setting.output)

        this._activePage =  pages.main
        this._activePage.classList.add(classTokenConst.showPage)
        
        this._controlElements = {
            formSettingsTheme: document.getElementById('form-settings-theme'),
            formListCurrency:document.getElementById('form-list-currency'),
            formSettingsOutput:document.getElementById('form-setting-output'),
            formTwoCurrency:document.getElementById('form-two-currency-converter'),
            formAddCurrency:document.getElementById('form-add-currency')
        }

        this._formAddCurrency = new FormAddCurrency(this._controlElements.formAddCurrency, this._setting.listCurrency)
        this._mainForm = new MainForm(this._controlElements.formListCurrency,
            this._setting.listCurrencyMainForm,
            this._changeCurrencyMainFrom
        )
        this._formTwoCurrency = new FormTwoCurrency(this._controlElements.formTwoCurrency, this._setting.twoCurrency)

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
