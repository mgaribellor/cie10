export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}


 /*  export interface Items {
    score: number;
    word: string;    
  }
  
 */
  export interface Items {
    cod: string;
    nom: string;   
    ane : string;
    ayu : string;
    cap : string;
    des : string;
    hom : string;
    mat : string; 
    tot : string; 
    uvr : string; 
    nombre: string;
    vlr : string; 
  }

  export interface ItemsCIE {
    cod: string;
    liminferior: string;   
    limsuperior : string;
    name : string;
    sexo : string;
  }


  export interface Manual {
    value: string;
    viewValue: string;
  }
  
