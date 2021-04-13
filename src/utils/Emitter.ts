export default class Emitter{
    _events:any
    constructor(){
        this._events = {}
    }
    on = (eventType:string,listener:any) => {
        if(typeof listener !== 'function'){
            return
        }
        if(!this._events){
            this._events = {}
        }
        if(!this._events[eventType]){
            this._events[eventType] = []
        }
        this._events[eventType].push(listener)
    }
    off = (eventType:string,listener:any) => {
        if(!this._events){
            return
        }
        (this._events[eventType] || []).filter((item:any) => (item !== listener))
    }
    trigger = (eventType:string,...args:any) =>{
        if(!this._events){
            return
        }
        (this._events[eventType] || []).forEach((cb:any) => {
            cb.apply(this,args)
        })
    }
}