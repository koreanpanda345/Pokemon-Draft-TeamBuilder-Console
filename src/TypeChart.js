const {Generations} = require('@pkmn/data');
const {Dex} = require('@pkmn/dex');
const {} = require('@smogon/calc');
module.exports = class TypeChart {
    /**
    * @typedef {string[]} types
    */
    types;
    /**
    * 
    * @param {string[]} types 
    */
    constructor(types){
        this.types = types;
    }
    getTypeChart() {
        let chart = [];
        for(let type of this.types){
            const _type = new Generations(Dex).get(8).types.get(type);
            chart.push(_type.effectiveness);
        }
        return chart;
    }
}