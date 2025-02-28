export abstract class TableHeadEntity {
    name: string;
    prop: string;
    type: string;
    trueLabel?: string;
    falseLabel?: string;

    constructor(name: string, prop: string, type: string){
        this.name = name;
        this.prop = prop;
        this.type = type;
    }
}

export class TableHeadChipEntity implements TableHeadChipEntity {
    name: string;
    prop: string;
    type: string;
    trueLabel: string;
    falseLabel: string;

    constructor(options:{name: string, prop: string, type: string, trueLabel: string, falseLabel: string}){
        this.name = options.name;
        this.prop = options.prop;
        this.type = options.type;
        this.trueLabel = options.trueLabel;
        this.falseLabel = options.falseLabel;
    }
}
