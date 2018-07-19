let data = [
    {
    "category":"Chinese Combos",
    "description":"",
    "name":"Egg Chinese Combo",
    "price":120,
    "vegflag":"nonveg"
    },
    {
    "category":"Chinese Combos",
    "description":"Chilli Garlic Chicken, Vegetable Fried Rice/ Noodles, Hong Kong Sauce",
    "name":"Chicken Chinese Combo",
    "price":110,
    "vegflag":"nonveg"
    },
    {
    "category":"Chinese Combos",
    "description":"",
    "name":"Lebanese Falafal Pockets",
    "price":130,
    "vegflag":"veg"
    },
    {
    "category":"Chinese Combos",
    "description":"",
    "name":"Lebanese Chicken Pockets",
    "price":160,
    "vegflag":"nonveg"
    },
    {
    "category":"Chinese Starter",
    "description":"",
    "name":"Mexican Veg Nachos",
    "price":170,
    "vegflag":"veg"
    },
    {
    "category":"Chinese Starter",
    "description":"",
    "name":"Mexican Non Veg Nachos",
    "price":140,
    "vegflag":"nonveg"
    },
    {
    "category":"Chinese Starter",
    "description":"",
    "name":"Indonesian Nasi Goreng Tofu",
    "price":160,
    "vegflag":"veg"
    },
    {
    "category":"Chinese Starter",
    "description":"",
    "name":"Indonesian Nasi Goreng Chicken",
    "price":120,
    "vegflag":"nonveg"
    },
    {
    "category":"Salads",
    "description":"",
    "name":"Veg Salad",
    "price":90,
    "vegflag":"veg"
    },
    {
    "category":"Salads",
    "description":"",
    "name":"Non Veg Salad",
    "price":110,
    "vegflag":"nonveg"
    },
    {
    "category":"Oriental",
    "description":"Chilli Garlic Chicken",
    "name":"Chicken Starter",
    "price":85,
    "vegflag":"nonveg"
    },
    {
    "category":"Oriental",
    "description":"Chilli Garlic Potatoes",
    "name":"Veg Starter",
    "price":75,
    "vegflag":"veg"
    },
    {
    "category":"Oriental",
    "description":"",
    "name":"Paneer Starter",
    "price":100,
    "vegflag":"veg"
    },
    {
    "category":"Chinese Combos",
    "description":"Chilli Garlic Potatoes, Vegetable Fried Rice/ Noodles, Hong Kong Sauce",
    "name":"Veg Chinese Combo",
    "price":90,
    "vegflag":"veg"
    }
    ]


var menuItemObject= function(availabletime,category,description,name,price,vegflag){
    this.category=ko.observable(category);
    this.description=ko.observable(description);
    this.name=ko.observable(name);
    this.price=ko.observable(price);
    this.vegflag=ko.observable(vegflag);
    this.quantityOrdered=ko.observable(0);
}

var viewModel=function(){
    var self=this;
    self.chineseCombos=ko.observableArray();
    self.oriental=ko.observableArray();
    self.chineseStarter=ko.observableArray();
    self.salads=ko.observableArray();

    self.itemsOrdered=ko.observableArray()

    self.totalAmount=ko.observable(0)

    self.claculateTotal=function(){
        let total=0
        for(let item of self.itemsOrdered()){
            total=total+(item.price()*item.quantityOrdered())            
        }
        self.totalAmount(total);
    }

    self.emptyCart=function(){
        for(let item of self.itemsOrdered()){
            item.quantityOrdered(0)            
        }
        self.itemsOrdered.removeAll();
        self.totalAmount(0);
    }

    self.pushItesms=function(object){
        console.log(123)
        if(self.itemsOrdered().length>0){
            for(let item of self.itemsOrdered()){
                console.log(item,object)
                if(item.name() ===object.name()){
                    self.itemsOrdered.remove(item);
                    self.itemsOrdered.push(object);
                }else{
                    self.itemsOrdered.push(object)
                }
                if(item.quantityOrdered()===0){
                    self.itemsOrdered.remove(item);
                }
            }
        }else{
            self.itemsOrdered.push(object)
        }
        self.claculateTotal();
    }

    self.decreaseOrderQuantity=function(data){
        if(data.quantityOrdered()>0){
            data.quantityOrdered(data.quantityOrdered()-1);
            self.pushItesms(data)
        }
    }

    self.increaseOrderQuantity=function(data){
        data.quantityOrdered(data.quantityOrdered()+1);
        self.pushItesms(data)
    }
    


        for(let item of data){
            menuItem = ko.observable(new menuItemObject(item.availabletime,item.category,item.description,item.name,item.price,item.vegflag));
            if(item.category==="Chinese Combos"){
                self.chineseCombos.push(menuItem);
            }else if(item.category==="Chinese Starter"){
                self.chineseStarter.push(menuItem);
            }else if(item.category==="Oriental"){
                self.oriental.push(menuItem);
            }else{
                self.salads.push(menuItem);
            }
        }

    
}

ko.applyBindings(new viewModel());
