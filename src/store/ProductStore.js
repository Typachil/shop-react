import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor(){
        this._categories = [];
        this._types = [];
        this._products = [];
        this._cart = [];

        this._currentCategory = {};
        this._currentType = {};
        makeAutoObservable(this);
    }

    setСategories(categories){
        this._categories = categories;
    }

    setTypes(types){
        this._types = types;
    }

    setProduts(products){
        this._products = products;
    }

    setCart(products){
        this._cart = products;
    }

    setCartProduct(product){
        this._cart.push(product);
    }

    deleteCart(id){
        this._cart = this._cart.filter(item => id !== item.id);
    }

    setCurrentСategory(category){
        this._currentCategory = category;
    }

    setCurrentType(type){
        this._currentType = type;
    }

    get categories(){
        return this._categories;
    }

    get types(){
        return this._types;
    }

    get products(){
        return this._products;
    }

    get cart(){
        return this._cart;
    }

    get currentСategory(){
        return this._currentCategory;
    }

    get currentType(){
        return this._currentType;
    }
}