export interface IAlert {
    msg: string;
    type: string;
    show: boolean; 
}

export interface IList {
    id: number;
    title: string; 
}

export interface IListFunc {
    setList:  React.Dispatch<React.SetStateAction<IList>>
}